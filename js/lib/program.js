function Program() {}

Program.load = function(url, cb) {
  $.get(url, function(data) {
    var code = eval('({' + data + '})');
    cb(code);
  }, 'html');
};
