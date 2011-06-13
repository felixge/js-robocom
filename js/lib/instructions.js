module.exports = {
  'rotate': {
    costs: 1,
    execute: function(game, robot, args) {
      robot.rotate(args[0]);
      return args;
    }
  },
  'transfer': {
    costs: function(game, robot, args) {
    },
    execute: function() {
    },
  },
  'build': {
    costs: function(game, robot, args) {
      return 10;
      //if (args[0] === 'builder') {
        //return 10;
      //}

      //if (args[0] === 'runner') {
        //return 5;
      //}

      //return new Error('build: unknown type: ' + args[0]);
    },
    execute: function(game, robot, args) {
      var coordinates = game.getCoordinatesInFrontOf(robot);
    },
  }
};
