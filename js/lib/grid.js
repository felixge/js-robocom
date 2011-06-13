function Grid() {
  this._cells = {};
}

Grid.create = function(size) {
  var instance = new this();
  instance.init(size);
  return instance;
};

Grid.prototype.init = function(size) {
  for (var a = 0; a < size; a++) {
    this._cells[a] = {};
    for (var b = 0; b < size; b++) {
      this._cells[a][b] = null;
    }
  }
};
