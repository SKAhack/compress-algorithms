//
// Switched Run-length encoding; RLE
// http://en.wikipedia.org/wiki/Run-length_encoding
// http://www.geocities.jp/m_hiroi/light/pyalgo29.html
//

var MAX_LEN = 255;

function SRLE(){}

SRLE.encode = function(data){
  var res = [],
      mode = 'literal',
      buff = [],
      num = 0,
      i;

  for (i = 0; i < data.length; i++) {
    if (mode === 'literal') {
      buff.push(data[i]);

      if (i < data.length - 1 && data[i] === data[i + 1]) {
        res.push(buff.length);
        res = res.concat(buff);
        mode = 'fill';
        num = 0;
      } else if (buff.length === MAX_LEN) {
        res.push(buff.length);
        res = res.concat(buff);
        buff = [];
      }
    } else { // fill
      num += 1;

      if (num === MAX_LEN) {
        res.push(num);
        num = 0;
      }

      if (i < data.length - 1 && data[i] !== data[i + 1]) {
        res.push(num);
        mode = 'literal';
        buff = [];
      }
    }
  }

  if (mode === 'literal') {
    res.push(buff.length);
    res = res.concat(buff);
  } else {
    res.push(num);
  }

  return res;
};

SRLE.decode = function(data){
  var mode = 'literal',
      res = [],
      num = -1, num1,
      c, i, j;

  for (i = 0; i < data.length; i++) {
    if (mode === 'literal') {
      if (num < 0) {
        num = num1 = data[i];
        continue;
      }

      res.push(data[i]);
      num -= 1;

      if (num === 0) {
        num = -1;
        if (num1 < MAX_LEN) {
          mode = 'fill';
          c = data[i];
        }
      }
    } else { // fill
      for (j = 0; j < data[i]; j++) {
        res.push(c);
      }

      if (data[i] < MAX_LEN) {
        mode = 'literal';
      }
    }
  }

  return res;
};

module.exports = SRLE;
