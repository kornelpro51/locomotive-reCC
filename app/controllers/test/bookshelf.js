var locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  _ = require('underscore'),
  Controller = new Controller(),
  ss = require('../../helpers/sequelizeStatusMap.js'),
  generateResponse = require('../../helpers/responseGenerator')


  Controller.createOrder = function() {

    var Bookshelf = this.app.models.bookshelf
    var Cards = this.app.bookshelf.Collection.extend({
      model: Bookshelf.Card
    });
    var this_ = this


    if (!this.req.isAuthenticated()) {
      return this.res.json(generateResponse(false, 'Not Logged In', null))
    }

    console.log(this_.req.body)

    // Get Address by submitted ID (Make Sure It Belongs to logged in user)
    new Bookshelf.Address({
      id: this_.req.body.address.id,
      userId: this_.req.user.id
    }).fetch()

    // Ensure Address Exists, Query For Cards
    .then(function(address) {

      if (address == null) {
        throw "Error, Address Not Found"
      }

      console.log(address.toJSON())

      return true
    })

    .then (function(success) {


      return new Cards()
          .query(function(qb) {
          qb.where('status', '=', ss.Card.status.Available)
            .andWhere('inCart', '=', this_.req.user.id)
            .andWhere('cartType', '=', 'UID')

        }) 
        .fetch()
    })


    .then(function(response) {
        this_.res.json(generateResponse(true, '', response.toJSON()))
      },
      function(err) {
        console.log(err)
      })

  }


module.exports = Controller;