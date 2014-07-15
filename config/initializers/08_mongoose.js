
module.exports = function() {

    this.mongoose = require('mongoose');
    this.mongooseTypes = require("mongoose-types");
    this.mongooseTypes.loadTypes(this.mongoose);

    
    this.mongoose.connect('mongodb://reccAdm:4eOuSJfSTKkcK8me@paulo.mongohq.com:10074/reCC');

}
