var crypto = require('crypto')
var moment = require('moment')
var _ = require('underscore')
var queueEngine = require('./queueEngine')
var request = require('request');
var querystring = require('querystring');
var http = require('https');

var customerId = 'l5WORKa7Cb'
var SecretAccessKeyID = 'yLSNwCB4PAjNru6A35LaHwIDJASC+ZIVnij8VF1waaaalXAxo7zeKlDtG0SNTCAZXP5Cbn1rqJ3Pc+C5xhBJ1A=='
var URL = 'api.cardflo.com'
var contentType = null
var servicePath = null
var method = null
var timestamp = null



cardFlo = { 

  queueBalanceRequest: function(cardId, retailerId, cardNumber, pin, attempt) {

    queueEngine.pushMessage({
      retailerId: retailerId,
      cardNumber: cardNumber,
      pin: pin,
      cardId: cardId,
      timestamp: moment().zone('-05:00').format('ddd, DD MMM YYYY HH:mm:ss ZZ'),
      attempt: attempt ? attempt : 0,
      deffered: false
    })

  },

  queueBatchBalanceRequest: function(cardId, retailerId, cardNumber, pin, attempt) {

    // TODO Implement This

  },  

  queueDefferedRequest: function(response, msgBody, attempt, delay, deffer) {

    queueEngine.pushMessage({
            requestId: response.requestId,
            cardId: msgBody.cardId,
            timestamp: moment().zone('-05:00').format('ddd, DD MMM YYYY HH:mm:ss ZZ'),
            attempt: msgBody.attempt + 1,
            deffered: true
          })

  },


  getBalance: function(message, callback) {

    contentType = 'application/x-www-form-urlencoded';
    servicePath = "/services/giftcardbalance";
    method = 'POST'
    timestamp = moment().zone('-05:00').format('ddd, DD MMM YYYY HH:mm:ss ZZ')
    var mesBody = JSON.parse(message.Body)

    var data = querystring.stringify({
      retailerId: mesBody.retailerId,
      cardNumber: mesBody.cardNumber,
      pin: mesBody.pin
    })

    console.log(data)

    var options = {
      host: URL,
      path: servicePath,
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': "CFA " + customerId + ":" + this.generateSignture(data),
        'Date': moment().zone('-05:00').format('ddd, DD MMM YYYY HH:mm:ss ZZ')
      }
    };


    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {

        console.log("getBalance response: " + chunk)
        callback(message, chunk)
      });
      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });
    });


    console.log("getBalance");

    req.write(data);
    req.end();

  },


  getDeffered: function(message, callback) {

    contentType = ""
    servicePath = "/services/giftcardbalance/" + JSON.parse(message.Body).requestId;
    method = 'GET'
    timestamp = moment().zone('-05:00').format('ddd, DD MMM YYYY HH:mm:ss ZZ')

    var data = ''

    var options = {
      host: URL,
      path: servicePath,
      method: method,
      headers: {
        'Authorization': "CFA " + customerId + ":" + this.generateSignture(''),
        'Date': moment().zone('-05:00').format('ddd, DD MMM YYYY HH:mm:ss ZZ')
      }
    };


    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        callback(message, chunk)
      });
      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });
    });

    req.write(data);
    req.end();

  },

  generateSignture: function(params) {

    var signture = crypto.createHmac('sha1', SecretAccessKeyID).update(this.generateStringtoSign(params)).digest('base64')
    return signture

  },

  generateStringtoSign: function(params) {

    var returnString = method + "\n" + contentType + "\n" + timestamp + "\n" + params + servicePath
    console.log(returnString.toString('utf8'))
    return returnString.toString('utf8')

  },


  responseMap: function(message, response) {

    var response = JSON.parse(response)
    var this_ = this

    if (response['responseMessage'] == "RequestId does not exists!") {
        return queueEngine.deleteMessage(message); // TODO Create New Deffered SQS Request
    }

    console.log("RESPONSE CODE : " + response['responseCode']) 

    switch (response['responseCode']) {

      case '000': // Success 
        console.log(response); 
        queueEngine.deleteMessage(message);
        // TODO Write changes to db 
        break;

      case '010': // Deffered 
        console.log('*****' + JSON.stringify(response))  
        var msgBody = JSON.parse(message.Body)
        queueEngine.deleteMessage(message); // Delete Old Request 
        cardFlo.queueDefferedRequest(response, msgBody); // Create New Deffered SQS Request (TODO calculate and add delat)
        break;

      case '201': // Invalid Pin
        queueEngine.deleteMessage(message); // Delete Old Request
        // Todo alert error
        break;

    }

  },

  // Process messages returned from queue
  listen: function(maxMessages, interval) {

  setInterval(function() {

        console.log("Checcking For Messages")
        queueEngine.pullMessages(maxMessages, process);


    }, interval)

  }

}

  // Process messages returned from queue
 var process = function(messages) {

    interval = 0

    _.each(messages, function(message) {

      setTimeout(function() {

        interval++

        //console.log("DEBUG processMessage " + responseMap)
        console.log("Processing Message")
        req = JSON.parse(message.Body)
        req.deffered ? cardFlo.getDeffered(message, cardFlo.responseMap) : cardFlo.getBalance(message, cardFlo.responseMap);


      }, 20 * interval)

    })

  }



module.exports = cardFlo