function Game() {
  EventEmitter.call(this);

  this._size = null;
  this._cells = {};
  this._robots = [];
  this._step = 0;
}
Game.prototype = EventEmitter.prototype;

Game.create = function(size) {
  var instance = new Game();
  instance.init(size);
  return instance;
};

Game.prototype.init = function(size) {
  this._size = size;
  for (var a = 0; a < size; a++) {
    this._cells[a] = {};

    for (var b = 0; b < size; b++) {
      this._cells[a][b] = null;
    }
  }
};

Game.prototype.add = function(playerName, code) {
  var player = Player.create(playerName);
  var robot = this._createRobot(code, player);
  robot.setRotation(Math.floor(Math.random() * 4));

  while (true) {
    var a = this._randomCoordinate();
    var b = this._randomCoordinate();

    var cell = this._getRobot(a, b);
    if (cell) {
      continue;
    }

    this._setRobot(a, b, robot);
    break;
  }
};

Game.prototype._randomCoordinate = function() {
  return Math.floor(Math.random() * this.getSize());
};

Game.prototype._getRobot = function(a, b) {
  return this._cells[a][b];
};

Game.prototype._removeRobot = function(a, b) {
  this._cells[a][b] = null;
};

Game.prototype._setRobot = function(a, b, robot) {
  this._cells[a][b] = robot;
  robot.setCoordinates(a, b);
};

Game.prototype.kill = function(robot) {
  var coordinates = robot.getCoordinates();
  this._removeRobot(coordinates.a, coordinates.b);
  var index = this._robots.indexOf(robot);
  this._robots.splice(index, 1);
  this.emit('death', robot);
};

Game.prototype.getSize = function() {
  return this._size;
};

Game.prototype.getRobots = function() {
  return [].concat(this._robots);
};

Game.prototype.isFirstStep = function() {
  return this._step === 1;
};

Game.prototype.nextTick = function() {
  this._step++;

  if (this.isFirstStep()) {
    this._spawnInitialRobots();
    return;
  }

  var self = this;
  this.getRobots().forEach(function(robot) {
    robot.nextTick();
  });
};

Game.prototype._spawnInitialRobots = function() {
  this.getRobots().forEach(function(robot) {
    this.emit('spawn', robot);
  }.bind(this));
};

Game.prototype._createRobot = function(code, player) {
  var robot = Robot.create(code, player, this);
  this._robots.push(robot);
  return robot;
};

Game.prototype.buildRobot = function(creator) {
  var coordinates = this._getCoordinatesInFrontOf(creator);
  if (this._getRobot(coordinates.a, coordinates.b)) {
    return;
  }

  var robot = this._createRobot(creator._code, creator.getPlayer());
  this._setRobot(coordinates.a, coordinates.b, robot);
  robot.setRotation(creator.getRotation());
  this.emit('spawn', robot);
};

Game.prototype._getCoordinatesInFrontOf = function(robot) {
  var coordinates = robot.getCoordinates();
  var rotation = robot.getRotation();

  var a = 0;
  var b = 0;

  if (rotation === 0) {
    a = -1;
  } else if (rotation === 1) {
    b = 1;
  } else if (rotation === 2) {
    a = 1;
  } else if (rotation === 3) {
    b = -1;
  }

  coordinates.a = (coordinates.a + a + this._size) % this._size;
  coordinates.b = (coordinates.b + b + this._size) % this._size;

  return coordinates;
};
