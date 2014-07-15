var fs        = require('fs');
var path      = require('path');
var async     = require('async');
var Sequelize = require("sequelize");



// setup sequelize
module.exports = function(done) {
  // store reference to sequelize in app instance

  var dbhost = 'recc.caydji3lsdwy.us-east-1.rds.amazonaws.com';
  this.sequelize = new Sequelize('dev1', 'cardcash_dev', 'kt%K&JPwQPK%0F', {host: dbhost});

  // keep track of all models in a 'model registry'
  var registry  = require('../../app/models');

  // find models and load them
  var modelsdir = __dirname + '/../../app/models/Sequelize';
  var this_     = this;

  var models = []

// Models  (Using an array because objects dont seem to work with Async)
  models[0]     =  this_.sequelize.import(modelsdir + "/address")
  models[1]     =  this_.sequelize.import(modelsdir + "/buy")
  models[2]     =  this_.sequelize.import(modelsdir + "/card")
  models[3]     =  this_.sequelize.import(modelsdir + "/file")
  models[4]     =  this_.sequelize.import(modelsdir + "/merchant")
  models[5]     =  this_.sequelize.import(modelsdir + "/sell")
  models[6]     =  this_.sequelize.import(modelsdir + "/user")

 // Merchant to Card
  models[4].hasMany (models[2],  { foreignKey: 'merchantId' , useJunctionTable: false });
  models[2].belongsTo  (models[4],  { foreignKey: 'merchantId', useJunctionTable: false  });

  // Card to File
  models[2].hasOne  (models[3],  { foreignKey: 'cardId' });

  // Buy <> Card
  models[1].hasMany (models[2],  { foreignKey: 'buyOrderId' , useJunctionTable: false });
  models[2].belongsTo  (models[1],  { foreignKey: 'buyOrderId', useJunctionTable: false  });

  // User <> Buy
  models[6].hasMany (models[1],  { foreignKey: 'userId' , useJunctionTable: false });
  // Buy belongsTo User
  models[1].belongsTo (models[6],  { foreignKey: 'userId', useJunctionTable: false  });

  // User <> Sell
  models[6].hasMany (models[5],  { foreignKey: 'userId' , useJunctionTable: false }); 
  models[5].belongsTo (models[6],  { foreignKey: 'userId', useJunctionTable: false  });

  // Sell to Card
  models[5].hasMany (models[2],  { foreignKey: 'sellOrderId' , useJunctionTable: false });
  models[2].belongsTo  (models[5],  { foreignKey: 'sellOrderId', useJunctionTable: false  });

registry.registerSequalize(this.sequelize)

async.forEachSeries(models, function(model, callback) {

  registry.registerModel(model)

  if (this_.env == 'refresh') { model.drop().success( function () { model.sync() } ) }

  // Or just sync
  else { model.sync() }


 callback()

});

    done();

};