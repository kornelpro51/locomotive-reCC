var Bookshelf = require('bookshelf');

module.exports = function() {

  this.bookshelf = Bookshelf.initialize({
    client: 'mysql',
    connection: {
      host: 'recc.caydji3lsdwy.us-east-1.rds.amazonaws.com',
      user: 'cardcash_dev',
      password: 'kt%K&JPwQPK%0F',
      database: 'dev1',
      charset: 'utf8'
      // ,debug    : true
    }
  });

  this_ = this
  this.models = {}
  this.models['bookshelf'] = {}

  this.models.bookshelf.Buy = this.bookshelf.Model.extend({
    tableName: 'Buy',
    user: function() {
      return this.hasOne(this_.models.bookshelf.User, "id")
    }
  });

  this.models.bookshelf.Address = this.bookshelf.Model.extend({
    tableName: 'Addresses',
    user: function() {
      return this.hasOne(this_.models.bookshelf.User, "userId")
    }
  });

  this.models.bookshelf.Card = this.bookshelf.Model.extend({
    tableName: 'Cards',
    buyOrder: function() {
      return this.hasOne(this_.models.bookshelf.Buy, "buyOrderId")
    }
  });

  this.models.bookshelf.User = this.bookshelf.Model.extend({
    tableName: 'Users',
    buyOrders: function() {
      return this.hasMany(this_.models.bookshelf.Buy, "userId")
    }
  });



}