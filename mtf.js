//
// Move-to-Front; MTF
// http://www.geocities.jp/m_hiroi/light/pyalgo48.html
//

var _ = require('underscore');
var BWT = require('./bwt.js');

function MTF(){}

MTF.encode = function(data) {
  var table = _.range(256);
  var res = [];

  for (var i = 0; i < data.length; i++) {
    var code = data[i].charCodeAt();
    var idx = table.indexOf(code);
    res.push(idx);

    if (idx !== 0) {
      table.splice(idx, 1);
      table.unshift(code);
    }
  }

  return res;
};

MTF.decode = function(data) {
  var table = _.range(256);
  var res = [];

  for (var i = 0; i < data.length; i++) {
    var c = table[data[i]];

    if (data[i] > 0) {
      table.splice(data[i], 1);
      table.unshift(c);
    }

    res.push(String.fromCharCode(c));
  }

  return res.join('');
};

module.exports = MTF;
