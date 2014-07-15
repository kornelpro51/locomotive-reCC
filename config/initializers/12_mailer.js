/**
 * Created by aldo on 11/22/13.
 */
var nodemailer = require("nodemailer");

module.exports = function() {

  this.transport = nodemailer.createTransport("SES", {
    AWSAccessKeyID: "AKIAJ4R3TUKWWBFOCOTA",
    AWSSecretKey: "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"
  });

}