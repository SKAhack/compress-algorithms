//
// Run-length encoding; RLE
// http://en.wikipedia.org/wiki/Run-length_encoding
// http://www.geocities.jp/m_hiroi/light/pyalgo29.html
//

var _ = require('underscore');

function RLE(){}

var MAX_LEN = 255;
var MIN_LEN = 3;

RLE.encode = function(data){
  var d = s2a(data);
  var c = d[0];
  var res = [];
  var c1, num, i, j;

  for (i = 1; i < data.length; i++) {
    num = 1;
    while (num < MAX_LEN + MIN_LEN) {
      c1 = d[i];
      if (c !== c1) break;
      num++;
      i++;
    }

    if (num >= MIN_LEN) {
      for (j = 0; j < MIN_LEN; j++) {
        res.push(c);
      }
      res.push(num - MIN_LEN);
    } else {
      for (j = 0; j < num; j++) {
        res.push(c);
      }
    }

    if (num == MAX_LEN + MIN_LEN) {
      c = d[++i];
    } else {
      c = c1;
    }
  }

  return res;
};

RLE.decode = function(data){
  var res, c, c1, num, len, i, j;
  c = data[0];
  res = [];

  for (i = 1; i < data.length; i++) {
    num = 1;

    while (num < MIN_LEN) {
      c1 = data[i];
      if (c !== c1) break;
      num++;
      i++;
    }

    len = num;

    if (num === MIN_LEN) {
      len += data[i++];
      c1 = data[i++];
    }

    for (j = 0; j < len; j++) {
      res.push(c);
    }

    c = c1;
  }

  return a2s(res);
};

function s2a(str) {
  var buf = [];
  for (var i = 0; i < str.length; i++) {
    buf.push(str.charCodeAt(i));
  }
  return buf;
}

function a2s(buf) {
  return String.fromCharCode.apply(null, buf);
}

module.exports = RLE;
