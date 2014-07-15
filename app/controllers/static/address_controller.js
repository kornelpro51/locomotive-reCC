var passport = require('passport')
	, locomotive = require('locomotive')
	, _und = require('underscore')
	, util = require('util')
	, generateResponse  = require('../../helpers/responseGenerator')
	, Controller = locomotive.Controller;


var AddressController = new Controller();
var Addresses = require('../../models').Address;


AddressController.index = function () {

	var this_ = this;

    var conditions = { userId:  this_.req.user.id };

    Addresses.findAll({ where: conditions }, { order: 'def DESC'})
        .success(function (result) {
            this_.res.json(generateResponse(true, "", result));
        })
        .error(function (error) {
            var result  = {};
            this_.res.json (generateResponse(false, "Cannot Retrieve Addresses", error));
        });
}


AddressController.show = function () {

	var this_ = this;

    var successCall = function (result) {this_.res.json (generateResponse(true, "", result)) }
    var errorCall = function (error) {this_.res.json (generateResponse(false, "Cannot Retrieve Addresses", error)) }
    var conditions = {userID:  this.req.user.id, id: this.params('id')}

    this.getOne(conditions, successCall, errorCall);
}

AddressController.setDefault = function () {

    var this_ = this;
    var addressId = this_.params('id');
    var sequelize = new require('../../models').Sequalize;

    var conditions = { userId:  this.req.user.id,
                       id: addressId }

    Addresses.find({ where: conditions })
        .success(function (address) {
            address.def = 1;
            address.save()
                .success(function() {
                    Addresses.update({ 'def': 0 }, { id: { ne: addressId } }, { validate: 'false' }).success(function(){
                        this_.res.json(generateResponse(true, 'Address set up as default', addressId));
                    }).error(function(error) {
                        console.log(error);
                        this_.res.json(generateResponse(false, 'Error setting up Address as default', error))
                    });
                })
                .error(function(error) {
                    this_.res.json(generateResponse(false, 'Error setting up Address as default', error))
                });
        })
        .error(function (error) {
            this_.res.json(generateResponse(false, 'Error setting up Address as default', error))
        })
}

AddressController.create = function () {

    var this_ = this;

    var params = this.req.body;
    params['userId'] = this.req.user.id;

    Addresses.create(params)
        .success(function (result) {
            this_.res.json(generateResponse(true, "", result))
        })
        .error(function (error) {
            var result  = {}
            this_.res.json(generateResponse(false, "", error))
        })

}

// FILTERS
AddressController.before('*', function(next) {
    if (!this.req.isAuthenticated()) {
        return this.res.json(generateResponse(false, 'User not Logged In' , null));
    }
    next();
});

module.exports = AddressController;