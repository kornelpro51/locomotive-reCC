var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sellCartSchema = new Schema({
  merchant: String,
  value:   String
});

module.exports = mongoose.model('SellCart', sellCartSchema);