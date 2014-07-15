var locomotive = require('locomotive')
  , moment = require('moment')
  , Controller = locomotive.Controller
  , ss = require('../../helpers/sequelizeStatusMap.js')
  , generateResponse  = require('../../helpers/responseGenerator')
  , _ = require('lodash')
  , Controller = new Controller();


Controller.addToCart = function () {

    // Sell Cart items are stored as session variables

    var this_ = this;
    var Merchant = require('../../models').Merchant;

    if (this.req.session.cart == undefined) {
        this.req.session.cart = []
    }

    // Makes Sure Merchant id is active on the sell side
    var queryParams = {
        where: {isActive : [ss.Merchant.isActive.SellSide,
                ss.Merchant.isActive.Both],
                name: this.req.body['merchant']}
    }

    Merchant.find(queryParams)

    .success (function (merchant) {
         if (merchant == null) {return this_.res.json(generateResponse(false, 'Merchant Not Found', null))}
         var nextLength = this_.req.session.cart.length + 1
        // TODO: Validate value input to be number, and within a sane range
         var offerPrice = (this_.req.body['value'] / 100) * merchant.sellRate
         this_.req.session.cart.push ({id: nextLength,
                                       merchantId: merchant.id,
                                       name: merchant.name,
                                       image: merchant.image,
                                       value: this_.req.body['value'],
                                       sellRate: merchant.sellRate,
                                       offer: offerPrice })
         this_.res.json(generateResponse(true, 'success', this_.req.session.cart))

    })

    .error (function (err) {

         this_.res.json(generateResponse(false, 'error', err))

    })


}

Controller.updateCart = function () {

    // Sell Cart items are stored as session variables
    var this_ = this;
    var cart_body = this_.req.body;

    if (this.req.session.cart == undefined) {
        this.req.session.cart = []
    }

    this_.req.session.cart = cart_body;
    this_.res.json(generateResponse(true, 'success', this_.req.session.cart))

}


Controller.deleteFromCart = function () {

    var this_ = this;

    if (this.req.session.cart == undefined) {
        this.req.session.cart = []
    }

    _.remove(this_.req.session.cart, function (item) { return item.id == this_.param('itemId'); });

    this_.res.json(generateResponse(true, 'success', this_.req.session.cart))

}

Controller.getCart = function () {


    if (!this.req.session.cart === undefined) {
        this.req.session.cart = []
    }

   this.res.json(generateResponse(true, 'success', this.req.session.cart))

}

module.exports = Controller;