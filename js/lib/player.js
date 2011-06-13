function Player() {
  this._name = null;
}

Player.create = function(name) {
  var instance = new this();
  instance._name = name;
  return instance;
};

Player.prototype.getName = function() {
  return this._name;
};
