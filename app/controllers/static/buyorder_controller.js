var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  ss = require('../../helpers/sequelizeStatusMap.js'),
  generateResponse = require('../../helpers/responseGenerator'),
  _ = require('underscore'),
  Controller = new Controller(),
  BuyTransaction = require('../../models/Mongoose/buytransaction'),
  Cards = require('../../models').Card,
  Buy = require('../../models').Buy,
  Address = require('../../models').Address,
  sendInvoice = require('../../helpers/email_sender').sendInvoice;

  // Order Related Functions
  Controller.getOrder = function(cards, newOrder) {

    var this_ = this;
    if (!this.req.isAuthenticated()) {
      return this.res.json(generateResponse(false, 'Not Logged In', null))
    }

    var queryParams = {
      where: {
        id: this_.param('id'),
        userId: this_.req.user.id
      },
      include: [Cards],
      attributes: ['firstName', 'lastName', 'street1', 'street2', 'city', 'state', 'zip',
        'zipExtra', 'country', 'phone', 'payMethod', 'coupon', 'curValue', 'curSubTotal', 'curCharges',
        'curTotal', 'Buy.createdAt', 'Buy.status', 'Buy.id', 'Cards.merchantId', 'Cards.actualValue'
      ]
    }

    Buy.find(queryParams)
      .success(function(result) {
        return this_.res.json(generateResponse(true, '', result))
      })
      .error(function(error) {
        return this_.res.json(generateResponse(false, 'Error', error))
      })

  }

Controller.getAllOrders = function() {

  var this_ = this;
  if (!this.req.isAuthenticated()) {
    return this.res.json(generateResponse(false, 'Not Logged In', null))
  }

  var queryParams = {
    where: {
      userId: this_.req.user.id
    },
    attributes: ['firstName', 'lastName', 'street1', 'street2', 'city', 'state', 'zip',
      'zipExtra', 'country', 'phone', 'payMethod', 'coupon', 'curValue', 'curSubTotal', 'curCharges',
      'curTotal', 'createdAt', 'status', 'id'
    ]
  }

  Buy.findAll(queryParams)
    .success(function(result) {
      return this_.res.json(generateResponse(true, '', result))
    })
    .error(function(error) {
      return this_.res.json(generateResponse(false, 'Error', error))
    })

}

Controller.createOrder = function() {

  if (!this.req.isAuthenticated()) {
    return this.res.json(generateResponse(false, 'Not Logged In', null))
  }

  var this_ = this;
  var orderDetails = {};

  // Pull Address by ID, then begin setting order details and pull cards
  this.getOrderAddress(this_.req.user.id, this_.req.body.address.id)
    .then(function(address) {

      if (address == null) {
        throw "Error, Address Not Found"
      }
      orderDetails['userId'] = this_.req.user.id;
      orderDetails['address'] = JSON.parse(JSON.stringify(address));
      orderDetails['other'] = {
        payMethod: this_.req.body.payment.method, // ToDo Check Payment method in available options or throw err
        source: 'CardCash', // Should NOT be deafult  // ToDo if in available options or throw err
        Ip: this_.req.connection.remoteAddress,
        IpXfwd: this_.req.header('x-forwarded-for')
      }

      return Cards.findAndCountAll({
        where: {
          cartType: 'UID',
          inCart: this_.req.user.id,
          status: ss.Card.status.Available
        }
      })
    })

  // Calculate Totals
  .then(function(cards) {
    if (cards.count == 0) {
      throw "Error, No Cards In Cart"
    }
    return this_.calculateTotals(JSON.parse(JSON.stringify(cards.rows)), true)
  })

  // Process Payment and Complete Order
  .then(function(totals) {
    orderDetails['totals'] = totals;
    return this_.processPayment(orderDetails, this_.req.body.payment)
  }, function(err) {
    this_.res.json(generateResponse(false, 'Error', err))
  })
}

Controller.completeOrder = function(success, result, orderDtl) {

  var this_ = this;

  console.log("Complete Order")

  if (!success) {
    return this.res.json(generateResponse(false, 'Charge Error', result))
  }


  var this_ = this;
  var sequalize = new require('../../models').Sequalize;
  var orderId = null

  // Create Order
  Buy.create(orderDtl)

  .then(function(order) {

    this_.order = order;

    order = JSON.parse(JSON.stringify(order));

    orderId = {
      id: order.id
    }

    // RAW Query. Undocumented bug in sequalize update() makes me do this.
    var sql = "UPDATE Cards SET buyOrderId = " + order.id + " WHERE cartType='UID' AND status = " + ss.Card.status.Available + " AND inCart = " + this_.req.user.id

    return sequalize.query(sql);
  })
  // Process Payment and Complete Order
  .then(function(result) {
      // Template to use: buy_invoice.
      var emailResult = sendInvoice(this_.order, 'buy_invoice', this_.app.transport);
      console.log('Email Results');
      console.log(emailResult);

      this_.res.json(generateResponse(true, 'Order has been placed!', orderId));
  }, function(err) {
    this_.res.json(generateResponse(false, 'Error', err))
  })



}

Controller.calculateTotals = function(cards, newOrder) {

  // TOOD: Also calculate charges and coupons!!!

  var this_ = this;
  var totals = {}
  totals['curSubTotal'] = Number((_.reduce(cards, function(tot, card) {
    return tot + ((card.actualValue / 100) * card.buyRate)
  }, 0)).toFixed(2));
  totals['curValue'] = Number((_.reduce(cards, function(tot, card) {
    return tot + card.actualValue;
  }, 0)).toFixed(2));
  totals['curTotal'] = totals['curSubTotal']; // TODO: Curtoal should be CurSubtotal +/- charges

  // In a new order, we need to set the original value, which is of course also the current value
  if (newOrder) {
    totals['orgValue'] = totals['curValue']
    totals['orgSubTotal'] = totals['curSubTotal']
    totals['orgTotal'] = totals['curTotal']
  }

  return totals

}

Controller.getOrderAddress = function(userId, addressId) {

  return Address.find({
    where: {
      userId: userId,
      id: addressId
    },
    attributes: ['userId', 'firstName', 'lastName', 'street1',
      'street2', 'city', 'state', 'zip', 'zipExtra',
      'country', 'phone'
    ]
  })

}

Controller.processPayment = function(order, paymentDetails) {

  if (paymentDetails.method == 0)  return this.processBrainTree(order, paymentDetails);
  if (paymentDetails.method == 1)  return this.processACH(order, paymentDetails);
  if (paymentDetails.method == 2)  return this.processPayPal(order, paymentDetails);

  return this_.res.json(generateResponse(false, 'Charge Error', result))


}


Controller.processBrainTree = function(order, paymentDetails) {

  var this_ = this

  console.log("Process BrainTree")
  var saleRequest = {
    amount: order.totals.curTotal,
    creditCard: {
      number: paymentDetails.CC.number,
      cvv: paymentDetails.CC.CVV,
      expirationMonth: paymentDetails.CC.month,
      expirationYear: paymentDetails.CC.year
    },
    options: {
      submitForSettlement: true
    }
  };


  // Brain Tree
  this.app.gateway.transaction.sale(saleRequest, function(err, result) {

    if (err) {
      throw err
    };

    if (result.success) {

      btAtrributes = {
        btId: result.transaction.id,
        btLast4: result.transaction.creditCard.last4,
        btCardType: result.transaction.creditCard.cardType
      }




      // EXTEND NEW ATTRIBUTES INTO ORDER FIXME
      var orderdtl = _.extend(order['totals'],
        order['address'],
        order['other'],
        btAtrributes,
        {
          status: ss.Buy.status.Processing
        }
      );

      return this_.completeOrder(result.success, result, orderdtl);
    }

    if (!result.success) {

      return this_.res.json(generateResponse(false, 'Charge Error', result))
    }




  });


}


Controller.processPayPal = function(order, paymentDetails) {

  var this_ = this

  paypalAtrributes = {
    paypalEmail: Sequelize.STRING
  }



}

Controller.processACH = function(order, paymentDetails) {

  var this_ = this

  console.log("Process ACH")

  achAtrributes = {
    achAccount: paymentDetails.ACH.account,
    achRouting: paymentDetails.ACH.routing
  }

  var orderdtl = _.extend(order['totals'],
    order['address'],
    order['other'],
    achAtrributes,
    {
      status: ss.Buy.status.Processing
    }
  );

  console.log(orderdtl)

  // TODO Impose Validiation On ACH Account Numbers and Routing Numbers
  return this_.completeOrder(true, null, orderdtl);


}




module.exports = Controller;