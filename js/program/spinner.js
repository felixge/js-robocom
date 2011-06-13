main: {
  afterInit: function() {
    return ['build'];
  },
  afterBuild: function() {
    return ['rotate', 'left'];
  },
  afterRotate: function() {
    return ['build'];
  },
}
