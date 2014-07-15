var locomotive = require('locomotive'),
    moment = require('moment'),
    Controller = locomotive.Controller,
    Cards = require('../../models').Card,
    Merchant = require('../../models').Merchant,
    ss = require('../../helpers/sequelizeStatusMap.js'),
    generateResponse = require('../../helpers/responseGenerator'),
    Controller = new Controller();



Controller.addToCart = function(id) {
    var this_ = this;
    var params = this.req.query
    Cards.find({
        where: {
            id: this.params('id'),
            status: ss.Card.status.Available,
            verification: {gte:  ss.Card.verification.Verified},
            missingAt: null
        }
    })
        .success(function(result) {

            // Does the card exist?
            if (result == null) {
                this_.res.json({
                    'success': false,
                    'message': 'No Such Card'
                })
            }

            // Is it in your cart?
            else if (result.inCart == this_.req.sessionID) {
                this_.res.json(generateResponse(false, "This Card is already in your cart", null))
            }
            /*
            else if (result.cartTime > moment().format('YYYY-MM-DD HH:mm:ss').subtract('minutes', 5) ) { 
              this_.res.json(generateResponse(false, 'This card is in another customers cart' , null))
             }      
*/

            else {
                console.log(this_.req.sessionID)
                result.updateAttributes({
                    inCart: this_.req.isAuthenticated() ? this_.req.user.id : this_.req.sessionID,
                    cartType: this_.req.isAuthenticated() ? 'UID' : 'SID',
                    cartTime: moment.utc().format('YYYY-MM-DD HH:mm:ss')

                })
                    .success(function() {
                        Cards.find({
                            include: [{
                                model: Merchant,
                                as: Merchant.tableName,
                                attributes: ['name']
                            }],
                            attributes: ['Cards.id', 'Cards.cardType', 'Cards.actualValue', 'Cards.sellRate', 'Cards.inCart'],
                            where: {
                                id: this_.params('id')
                            }
                        }).success(function(cardUpdated) {
                            this_.res.json(generateResponse(true, 'This cart has been added to the shopping cart', cardUpdated));
                        });
                    })
                    .error(function(error) {
                        console.log(error);
                        this_.res.json(generateResponse(false, error, null))
                    })
            }


        })
        .error(function(error) {
            console.log(error);
            this_.res.json({
                'success': false,
                'message': error
            })
        })
}


Controller.deleteFromCart = function(id) {
    var this_ = this;
    var params = this.req.query
    Cards.find(this.params('id'))
        .success(function(result) {

            // Does the card exist?
            if (result == null) {
                this_.res.json({
                    'success': false,
                    'message': 'No Such Card'
                })
            }

            // Is it in your cart?
            else if (result.inCart != (this_.req.isAuthenticated() ? this_.req.user.id : this_.req.sessionID)) {
                this_.res.json(generateResponse(false, "This Card is not in your shopping cart", null))
            } else {
                result.updateAttributes({
                    inCart: null,
                    cartType: null,
                    cartTime: null

                })
                    .success(function() {
                        this_.res.json({
                            'success': true
                        });
                        this_.res.json(generateResponse(true, 'This cart has been removed from shopping cart', null))
                    })
                    .error(function(error) {
                        console.log(error);
                        this_.res.json({
                            'success': false,
                            'message': error
                        })
                    })
            }


        })
        .error(function(error) {
            console.log(error);
            this_.res.json({
                'success': false,
                'message': error
            })
        })
}

Controller.showCart = function() {


    var this_ = this;
    var params = this.req.query
    var response = null
    var Merchant = require('../../models').Merchant

    Cards.findAll({

        //include: [Merchant],
        include: [{
            model: Merchant,
            as: Merchant.tableName,
            attributes: ['name']
        }],
        attributes: ['Cards.id', 'Cards.cardType', 'Cards.actualValue', 'Cards.sellRate', 'Cards.inCart'],
        where: {
            inCart: this_.req.isAuthenticated() ? this_.req.user.id : this_.req.sessionID,
            cartType: this_.req.isAuthenticated() ? 'UID' : 'SID',
            status: ss.Card.status.Available
        }
    })

    .success(function(result) {

        //  Cards.getMerchant

        this_.res.json(generateResponse(true, '', result))

    })
        .error(function(error) {
            this_.res.json(generateResponse(false, error, null))
        })
}



module.exports = Controller;