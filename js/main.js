$(function() {
  var TIMEOUT = 0;

  var programs = {};
  Program.load('js/program/flooder.js', function(program) {
    programs.red = program;
    onProgramLoad();
  });
  Program.load('js/program/spinner.js', function(program) {
    programs.blue = program;
    onProgramLoad();
  });


  function onProgramLoad() {
    if (Object.keys(programs).length < 2) {
      return;
    }

    var game = Game.create(20);
    game.add('red', programs.red);
    game.add('blue', programs.blue);

    var visualizer = Visualizer.create($('.js_container'));
    visualizer.render(game);

    var interval;
    function continueGame() {
      interval = setInterval(function() {
        game.nextTick();
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
  };
});
