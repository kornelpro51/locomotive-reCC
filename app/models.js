module.exports = {
  registerModel : function(model) {
    this[model.name] = model;
  },
  registerSequalize : function(object) {
	this['Sequalize'] = object;
  }
};