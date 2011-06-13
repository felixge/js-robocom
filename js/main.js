$(function() {
  var TIMEOUT = 0;

  Program.load('js/program/spinner.js', function(program) {
    var game = Game.create(32);
    game.add('red', program);
    game.add('blue', program);

    var visualizer = Visualizer.create($('.js_container'));
    visualizer.render(game);

    var interval;
    function continueGame() {
      interval = setInterval(function() {
        game.nextStep();
      }, TIMEOUT);
    }


    $(document).keydown(function(e) {
      if (e.keyCode !== 27) {
        return;
      }

      if (interval) {
        clearInterval(interval);
        interval = null;
        return;
      }

      continueGame();
    });

    continueGame();
  });

  //var grid = Grid.create(8);
  //var visualizer = Visualizer.create();

  //var SIZE = 8;
  //var html = ['<table>'];

  //for (var a = 0; a < SIZE; a++) {
    //html.push('<tr>');
    //for (var b = 0; b < SIZE; b++) {
      //html.push('<td>' + a + ', ' + b + '</td>');
    //}
    //html.push('</tr>');
  //}

  //html.push('</table>');

  //$('.js_grid_container').html(html.join('\n'));
});
