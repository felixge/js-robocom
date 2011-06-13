var instructions = {
  'init': {
    costs: 0,
    execute: function(game, robot, args) {}
  },
  'rotate': {
    costs: 1,
    execute: function(game, robot, args) {
      robot.rotate(args[0]);
    }
  },
  'move': {
    costs: 1,
    execute: function(game, robot, args) {
      robot.move();
    }
  },
  'scan': {
    costs: 1,
    execute: function(game, robot, args) {
      var coordinates = game._getCoordinatesInFrontOf(robot);
      var otherRobot = game._getRobot(coordinates.a, coordinates.b);
      if (!otherRobot) {
        return ['empty'];
      }

      return (otherRobot.getPlayer() === robot.getPlayer())
        ? 'friend'
        : 'enemy';
    }
  },
  'transfer': {
    costs: function(game, robot, args) {
      return 1;
    },
    execute: function(game, robot, args) {
      var coordinates = game._getCoordinatesInFrontOf(robot);
      var otherRobot = game._getRobot(coordinates.a, coordinates.b);
      if (!otherRobot) {
        return;
      }

      var sourceProgram = robot._code[args[0]];
      otherRobot._code = $.extend(true, {}, otherRobot._code);

      var destProgram = {};
      otherRobot._code[otherRobot._currentProgram] = destProgram;
      for (var key in sourceProgram) {
        destProgram[key] = sourceProgram[key];
      }

      otherRobot._currentArgs = [];
      otherRobot._currentInstruction = 'init';
      otherRobot._remainingCycles = 0;
    },
  },
  'build': {
    costs: function(game, robot, args) {
      return 2;
      //if (args[0] === 'builder') {
        //return 10;
      //}

      //if (args[0] === 'runner') {
        //return 5;
      //}

      //return new Error('build: unknown type: ' + args[0]);
    },
    execute: function(game, robot, args) {
      game.buildRobot(robot);
    },
  }
};
