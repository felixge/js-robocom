main: {
  afterInit: function() {
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
  afterTransfer: function() {
    return ['rotate', 'right'];
  },
  afterBuild: function() {
    return ['rotate', 'right'];
  },
  afterRotate: function() {
    return ['scan'];
  }
},
virus: {
  afterInit: function() {
    return ['scan'];
  },
  afterScan: function(result) {
    if (result === 'empty') {
      return;
    }

    if (result === 'friend') {
      return ['transfer', 'main'];
    }

    return;
  },
}
