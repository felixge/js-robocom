function Visualizer() {
  this._$element = null;
  this._game = null;
  this._cellSize = null;
  this._cells = {};
}

Visualizer.create = function($element) {
  var instance = new this();
  instance._$element = $element;
  return instance;
};

Visualizer.prototype.render = function(game) {
  this._game = game;

  this._renderGrid();

  game.on('rotate', this._handleRotate.bind(this));
  game.on('spawn', this._handleSpawn.bind(this));
  game.on('death', this._handleDeath.bind(this));
};

Visualizer.prototype._renderGrid = function() {
  var size = this._game.getSize();
  var cellSize = this._cellSize = $(window).height() / size - 5;

  var html = ['<table cellspacing="0" cellpadding="0" border="1">'];
  for (var a = 0; a < size; a++) {
    html.push('<tr>');
    for (var b = 0; b < size; b++) {
      html.push('<td style="height: ' + cellSize + 'px; width: ' + cellSize + 'px"></td>');
    }
    html.push('</tr>');
  }
  html.push('</table>');

  this._$element.html(html.join('\n'));
  for (var a = 0; a < size; a++) {
    this._cells[a] = {};

    for (var b = 0; b < size; b++) {
      var selector =
        'tr:nth-child(' + (a + 1) + ') '
        + 'td:nth-child(' + (b + 1) + ')';
      this._cells[a][b] = $(selector, this._element);
    }
  }
};

Visualizer.prototype._getTd = function(coordinates) {
  //var $tr = $(this._$element.find('tr')[coordinates.a]);
  //var $td = $($tr.find('td')[coordinates.b]);
  //var selector =
    //'tr:nth-child(' + (coordinates.a + 1) + ') '
    //+ 'td:nth-child(' + (coordinates.b + 1) + ')';
  //var $td = this._$element.find(selector)

  //return $td;
  return this._cells[coordinates.a][coordinates.b];
};

Visualizer.prototype._handleRotate = function(robot) {
  var rotation = robot.getRotation();
  var $td = this._getTd(robot.getCoordinates());

  $td
    .attr('class', '')
    .addClass('rotate_' + rotation);
};

Visualizer.prototype._handleSpawn = function(robot) {
  var coordinates = robot.getCoordinates();
  var $td = this._getTd(coordinates);

  var color = robot.getPlayer().getName();
  var rotation = robot.getRotation();
  $td.append('<img style="width: ' + this._cellSize + 'px; height: ' + this._cellSize + 'px;" border="0" src="img/' + color + '.png">');
  $td.addClass('rotate_' + rotation);
};

Visualizer.prototype._handleDeath = function(robot) {
  var $td = this._getTd(robot.getCoordinates());
  $td.find('img').remove();
};
