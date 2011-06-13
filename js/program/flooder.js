main: {
  afterReady: function() {
    return ['scan'];
  },
  afterScan: function(result) {
    if (result === 'empty') {
      return ['build'];
    }

    if (result === 'enemy') {
      return ['transfer', 'virus'];
    }

    return ['rotate', 'right'];
  },
  afterBuild: function() {
    return ['transfer', 'main'];
  },
  afterTransfer: function() {
    return ['rotate', 'right'];
  },
  afterRotate: function() {
    return ['scan'];
  }
},
virus: {
  afterReady: function() {}
}
