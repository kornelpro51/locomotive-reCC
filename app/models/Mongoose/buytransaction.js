var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuyTransactionSchema = new Schema({
    orderId: { type: Number, required: true},
    transactionId: {type: String, required: true},
    resultJson: {type: String, required: true}
});

module.exports = mongoose.model('BuyTransaction', BuyTransactionSchema);