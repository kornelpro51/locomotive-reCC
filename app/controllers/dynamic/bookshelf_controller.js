var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    SequalizeController = new Controller(),
    _ = require('underscore'),
    util = require('util'),
    modelRegistry = require('../../models'),
    generateResponse = require('../../helpers/responseGenerator'),
    ss = require('../../helpers/sequelizeStatusMap.js'),
    Model = null;


SequalizeController.init = function() {

    var this_ = this 

    console.log(this.app.models.bookshelf.Buy)

 
     var Collection = this.app.bookshelf.Collection.extend({
      model: this.app.models.bookshelf.Buy
    });


    var configuredCollection =  configureCollection (Collection, 'attributes', 'related', 'where', 'order')

    configuredCollection
     .fetch().then(function(buys) {
      return this_.res.json(buys.toJSON());
    });

//.query('where', 'id', '<', '5').query('where', 'id', '>', '0').query('orderBy', 'id', 'desc').     
 
/*
    new this.app.models.bookshelf.Buy({'id': "2"})
      .fetch({withRelated:['User']})
      .then(function(usr) { 
        return this_.res.json(usr.toJSON());
      }).then(function(res) {
        console.log (res)
      }, function(err) {

        this_.res.json(err);

  });

 */


}


var configureCollection = function (collection, attributes, related, where, order, group, having) {

    return new collection().query('where', 'id', '<', '10').query('where', 'id', '>', '4').query('orderBy', 'id', 'desc')

}

module.exports = SequalizeController;