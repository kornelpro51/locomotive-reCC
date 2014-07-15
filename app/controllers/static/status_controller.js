var passport = require('passport')
	, locomotive = require('locomotive')
	, _ = require('underscore')
	, util = require('util')
	, generateResponse  = require('../../helpers/responseGenerator')
    , ss = require('../../helpers/sequelizeStatusMap.js')
	, Controller = locomotive.Controller;


var StatusController = new Controller();

StatusController.applyStatusMap = function() {
    var this_ = this;
    var orders_to_set = this.req.body;

    var status = this.params('type') === 'buy' ? _.invert(ss.Buy.status) : _.invert(ss.Sell.status);
    var orderType = _.invert(ss.Sell.orderType);
    var payMethods = _.invert(ss.Buy.payMethod);
    var items;
    if ( this.params('type') === 'buy' ) {
        items = _.map(orders_to_set, function(order) { order['status'] = status[order['status']]; order['payMethod'] = payMethods[order['payMethod']]; return order });
    } else {
        items = _.map(orders_to_set, function(order) { order['status'] = status[order['status']]; order['orderType'] = orderType[order['orderType']]; return order });
    }
    return this_.res.json(items);

}

StatusController.getStatusMap = function() {
    var this_ = this;
    var status = this.params('type') === 'buy' ? _.invert(ss.Buy.status) : _.invert(ss.Sell.status);
    return this_.res.json(status);
}

StatusController.getOrderTypesMap = function() {
    var this_ = this;
    var orderTypes = _.invert(ss.Sell.orderType);
    return this_.res.json(orderTypes);
}

StatusController.getValue = function() {
    var this_ = this;
    // Entry: Sell.status or Sell.orderType
    var entry = this.req.body.entry;
    var key   = this.req.body.key;
    var values = _.invert(eval('ss.' + entry));
    return this_.res.json(values[key]);
}

StatusController.getAll = function() { 

      return this.res.json(generateResponse(true, '', ss)); 
}

module.exports = StatusController;


