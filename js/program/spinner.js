main: {
  afterReady: function() {
    return ['build'];
  },
  afterBuild: function() {
    return ['rotate', 'right'];
  },
  afterRotate: function() {
    return ['build'];
  }
}
