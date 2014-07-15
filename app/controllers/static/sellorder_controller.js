var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  ss = require('../../helpers/sequelizeStatusMap.js'),
  generateResponse = require('../../helpers/responseGenerator'),
  _ = require('underscore'),
  Controller = new Controller(),
  Cards = require('../../models').Card,
  Sell = require('../../models').Sell,
  Merchant = require('../../models').Merchant,
  Address = require('../../models').Address,
  sendInvoice = require('../../helpers/email_sender').sendInvoice;

// Order Related Functions
Controller.getOrder = function(cards, newOrder) {

  var this_ = this;

  if (!this_.req.isAuthenticated()) {
    return this_.res.json(generateResponse(false, 'Not Logged In', null))
  }

  var queryParams = {
    where: {
      id: this_.param('id')
      , userId: this_.req.user.id
    },
    include: [ Cards ]
  }

  Sell.findAll(queryParams)
    .success(function(result) {
      return this_.res.json(generateResponse(true, '', result[0]))
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

  Sell.findAll(queryParams)
    .success(function(result) {
      return this_.res.json(generateResponse(true, '', result))
    })
    .error(function(error) {
      return this_.res.json(generateResponse(false, 'Error', error))
    })

}

Controller.createOrder = function() {

  var this_ = this;

  if (!this_.req.isAuthenticated()) {
    return this_.res.json(generateResponse(false, 'Not Logged In', null))
  }

  if (this_.req.session.cart.length === 0) {
    return this_.res.json(generateResponse(false, 'Cart is empty', null))
  }

  console.log(this_.req.session.cart);
  console.log(this_.req.body);
  console.log(this_.req.user.id);

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
        payoutType: this_.req.body.payoutType, // ToDo Check Payment method in available options or throw err
        orderType:  this_.req.body.orderType,
        status: 0, // Pending
        source: 'CardCash', // Should NOT be default  // ToDo if in available options or throw err
        Ip: this_.req.connection.remoteAddress,
        IpXfwd: this_.req.header('x-forwarded-for')
      }

      if (this_.req.body.payoutType == 0)  orderDetails['other'][''] = '';
      if (this_.req.body.payoutType == 1)  orderDetails['other']['amazonEmail'] = this_.req.body.amazonEmail;
      if (this_.req.body.payoutType == 2)  orderDetails['other']['paypalEmail'] = this_.req.body.paypalEmail;
      if (this_.req.body.payoutType == 3)  {
        orderDetails['other']['achRouting'] = this_.req.body.achRouting;
        orderDetails['other']['achAccount'] = this_.req.body.achAccount;
      }

      return this_.calculateTotals(this_.req.session.cart, true); // true -> new Order
  })
  // Complete Order
  .then(function(totals) {
    orderDetails['totals'] = totals;
    var orderdtl = _.extend(orderDetails['totals'],
      orderDetails['address'],
      orderDetails['other']
    );
    console.log(totals);
    return this_.completeOrder(orderdtl, this_.req.session.cart, this_.req.user)
  }, function(err) {
    this_.res.json(generateResponse(false, 'Error', err))
  })
}

Controller.completeOrder = function(orderDtl, cart, user) {

  console.log("Complete Sell Order")

  var this_ = this;
  var sequalize = new require('../../models').Sequalize;
  var orderId = null;

  // Create Order
  Sell.create(orderDtl)
  .then(function(order) {
    order = JSON.parse(JSON.stringify(order));

    orderId = {
      id: order.id
    };
    var cards_saved = true;

    _.each(cart, function(card) {
      Cards.create({
        sellOrderId: order.id,
        merchantId: card.merchantId,
        cardNumber: card.cardNumber,
        cardPin: card.cardPin,
        cardType:   orderDtl.orderType,
        // cartType:
        origOffer:  card.offer,
        enteredValue: 0,
        actualValue: 0,
        sellRate:   card.sellRate,
        buyRate: 0,
        // TODO Verify this
        status: ss.Card.status.Hidden,
        verification: ss.Card.verification.Pending
      }).success(function(card) {
        console.log('saved card ' + card.id);
      }).error(function(err){
        console.log(err);
      });
    });

    // Template to use sell_invoice.
    var emailResult = sendInvoice(order, user, 'sell_invoice', this_.app.transport);
    console.log('Email Results');
    console.log(emailResult);

    return cards_saved;
  })
  // Complete Order
  .then(function(result) {
    this_.req.session.cart = null;
    this_.res.json(generateResponse(true, 'Order has been placed!', orderId));
  }, function(err) {
    console.log(err);
    this_.res.json(generateResponse(false, 'Error', err))
  });

}

Controller.calculateTotals = function(cards, newOrder) {

  // TODO: Also calculate charges and coupons!!!
  var this_ = this;
  var totals = {}

  // TODO Should we summarize origOffer ? and add this new field ?
  totals['curSubTotal'] = 0.0;
  totals['curValue'] = 0.0;

  totals['curOffer'] = Number((_.reduce(cards, function(tot, card) {
    return tot + card.offer; }, 0)).toFixed(2));

  totals['curTotal'] = totals['curSubTotal']; // TODO: Curtoal should be CurSubtotal +/- charges

  // In a new order, we need to set the original value, which is of course also the current value
  if (newOrder) {
    totals['orgValue'] = totals['curValue'];
    totals['orgOffer'] = totals['curOffer'];
    totals['orgSubTotal'] = totals['curSubTotal'];
    totals['orgTotal'] = totals['curTotal'];
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

module.exports = Controller;