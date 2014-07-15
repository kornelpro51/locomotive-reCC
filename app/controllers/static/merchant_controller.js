var locomotive = require('locomotive'),
    generateResponse = require('../../helpers/responseGenerator'),
    Controller = locomotive.Controller;


var Merchant = require('../../models').Merchant;
ss = require('../../helpers/sequelizeStatusMap.js')


var Controller = new Controller();

Controller.getMerchant = function() {

    var this_ = this;
    var params = this.req.query

    // Pagination is achived by providing an offset equal to (page - 1) * limit
    var queryParams = {
        where: {
            isActive: [ss.Merchant.isActive.BuySide, ss.Merchant.isActive.Both]
        },
        attributes: ['name', 'image', 'description', 'passbookType', 'type', 'id'],
        order: 'name ASC',
    }

    Merchant.findAll(queryParams)

    .success(function(result) {

        //  if (result === 'undefined') {result = {}}
        this_.res.json(generateResponse(true, '', result));
    })

    .error(function(error) {
        console.log(error);
        this_.res.json(error)
    })


}

Controller.getActiveBuy = function() {

    var this_ = this;

    // Pagination is achived by providing an offset equal to (page - 1) * limit
    var queryParams = {
        where: {
            prettyURL: this.params('id'),
            isActive: [ss.Merchant.isActive.BuySide, ss.Merchant.isActive.Both]

        },
        attributes: ['name', 'image', 'description', 'passbookType', 'type', 'id', 'prettyURL']
    }

    Merchant.find(queryParams)

    .success(function(merchant) {


        if (merchant == null) {
            this_.res.json({
                'err': this_.param('prettyURL')
            })
        } else {

            merchant.getCards({
                attributes: ['id', 'cardType', 'actualValue', 'sellRate'],
                where: ["status = ? AND verification >= ? AND missingAt is NULL AND buyOrderId IS NULL AND (cartTime IS NULL OR cartTime < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 5 MINUTE) )", ss.Card.status.Available, ss.Card.verification.Verified]


            })
                .success(function(cards) {

                    merchant = JSON.parse(JSON.stringify(merchant))
                    merchant['cards'] = JSON.parse(JSON.stringify(cards))


                    this_.res.json(merchant)

                })


        }



    })

    .error(function(error) {
        console.log(error);
        this_.res.json(error)
    })

}


Controller.getActiveSell = function() {

    var this_ = this;
    var params = this.req.query

    // Pagination is achived by providing an offset equal to (page - 1) * limit
    var queryParams = {
        where: {
            isActive: [ss.Merchant.isActive.SellSide, ss.Merchant.isActive.Both]
        },
        attributes: ['name', 'image', 'description', 'passbookType', 'type', 'id'],
        order: 'name ASC',
    }

    Merchant.findAll(queryParams)

    .success(function(result) {

        //  if (result === 'undefined') {result = {}} 
        this_.res.json(generateResponse(true, '', result))
    })

    .error(function(error) {
        console.log(error);
        this_.res.json(generateResponse(false, error, null))
    })


}

module.exports = Controller;