var express = require('express');

module.exports = function() {
  this.use(express.errorHandler());
  this.use(express.logger("dev"));
}
