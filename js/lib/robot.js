function Robot() {
  this._a = null;
  this._b = null;
  this._rotation = null;
  this._operation = null;

  this._code = null;
  this._game = null;
  this._creator = null;
  this._player = null;


  // HACK
  this._args = [];
}

Robot.create = function(code, player, game) {
  var instance = new this();
  instance._creator = instance._player = player;
  instance._code = code;
  instance._game = game;
  return instance;
};

Robot.prototype.setCoordinates = function(a, b) {
  this._a = a;
  this._b = b;
};

Robot.prototype.getCoordinates = function() {
  return {a: this._a, b: this._b};
};

Robot.prototype.getPlayer = function() {
  return this._player;
};

Robot.prototype.setRotation = function(rotation) {
  this._rotation = rotation;
};

Robot.prototype.getRotation = function() {
  return this._rotation;
};

Robot.prototype.rotate = function(direction) {
  var spin = 0;

  if (direction === 'right') {
    spin = 1;
  }

  if (direction === 'left') {
    spin = -1;
  }

  if (!spin) {
    throw new Error('rotate: invalid direction: ' + direction);
  }

  this._rotation = (this._rotation + spin + 4) % 4;
  this._game.emit('rotate', this);
};

Robot.prototype.build = function() {
  this._game.buildRobot(this);
};

Robot.prototype.scan = function() {
  var coordinates = this._game._getCoordinatesInFrontOf(this);
  var robot = this._game._getRobot(coordinates);
  //if (
};

Robot.prototype.nextStep = function() {
  var operation = this._operation || 'ready';
  this._invoke(operation);

};

Robot.prototype._invoke = function(operation) {
  var name = operation.substr(0, 1).toUpperCase() + operation.substr(1);
  var r = this._code.main['after' + name].apply({}, this._args);
  this._args = [];

  if (!r) {
    this._commitSuicide();
    return;
  }

  this._operation = r.shift();
  this[this._operation].apply(this, r);
};

Robot.prototype._commitSuicide = function() {
  this._game.kill(this);
};
