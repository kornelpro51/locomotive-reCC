/**
 * Created by aldo on 11/22/13.
 */
var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '..', 'templates')
  , emailTemplates = require('email-templates')
  , Cards = require('../models').Card
  , User = require('../models').User
  , Buy = require('../models').Buy
  , Sell = require('../models').Sell
  , Merchant = require('../models').Merchant
  , File = require('../models').File
  , _ = require('lodash')
  , async = require('async');


module.exports =  {

  sendInvoice: function(order, invoiceTemplate, transport) {

    console.log('SendInvoice Called');
    var locals = {};
    var emailParams = {};

    var queryParams = {
      where: parseWhere(invoiceTemplate, order),
      include: [{
        model: Merchant,
        as: Merchant.tableName,
        attributes: ['name']
      }, {
        model: File,
        as: File.tableName,
        attributes: ['id']
      }]
    }

    async.parallel([
      function(callback) {
        Cards.findAll(queryParams)
          .success(function(cards) {
            callback(null, cards);
          })
      },
      function(callback) {
        User.find({where: {id: order.userId}})
          .success(function(user) {
            callback(null, user);
          })
      },
      function(callback) {
        Buy.find({where: {id: order.id}})
          .success(function(buy) {
            callback(null, buy);
          })
      },
      function(callback) {
        Sell.find({where: {id: order.id}})
          .success(function(sell) {
            callback(null, sell);
          })
      }
    ], function (err, results) {
//      console.log('Cards');
//      console.log(results[0]);
//      console.log('User');
//      console.log(results[1]);
//      console.log('BUY');
//      console.log(results[2]); // Buy
//      console.log('SELL');
//      console.log(results[3]); // Sell
      locals = {
        cards: results[0],
        user: results[1],
        order: _.isUndefined(results[2]) ? results[3] : results[2]
      };
      emailParams = {
        from: "CardCash <sales@cardcash.com>",
        to: results[1].email,
        subject: "Your invoice from CardCash " + order.id
      };

      emailTemplates(templatesDir, function(err, template) {

        if (err) {
          return { success: false, message: err }
        } else {
//          console.log('LOCALS before Template');
//          console.log(locals);
          template(invoiceTemplate, locals, function(err, html, text) {
            if (err) {
              console.log('Template error');
              console.log(err);
              return { success: false, message: err };
            } else {
              transport.sendMail(_.extend(emailParams, {
                html: html,
                text: text
              }), function(error, response) {
                console.log(error);
                if (error) {
                  return { success: false, message: error };
                } else {
                  console.log('Email sent');
                  return { success: true, message: "Message sent: " + response.message };
                }
              });
            }
          });
        }
      });
    });

  }

}

function parseWhere(invoiceTemplate, order) {
  var where = []
  var orderIdFilter = invoiceTemplate === 'buy_invoice' ? 'buyOrderId' : 'sellOrderId';
  where.push(orderIdFilter + " = " + order.id);

  return where;
}
