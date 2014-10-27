//
// Zero Run-length encoding; RLE
// http://www.geocities.jp/m_hiroi/light/pyalgo29.html
//

function ZRLE(){}

ZRLE.encode = function(data){
  var res = [],
      count = 0,
      i;

  var pushBinaries = function(count) {
    var c = count,
        buff = [];
    while (c !== 1) {
      buff.push(c & 1);
      c >>= 1;
    }
    return buff;
  };

  for (i = 0; i < data.length; i++) {
    if (data[i] === 0) {
      count += 1;
      continue;
    }

    if (count > 0) {
      res = res.concat(pushBinaries(count));
      count = 0;
    }

    if (data[i] === 0xfe) {
      res.push(0xff);
      res.push(0);
    } else if (data[i] === 0xff) {
      res.push(0xff);
      res.push(1);
    } else {
      res.push(data[i] + 1);
    }
  }

  if (count > 0) {
    res = res.concat(pushBinaries(count));
  }

  return res;
};

ZRLE.decode = function(data){
  var res = [],
      buff = [],
      count,
      i;

  for (i = 0; i < data.length; i++) {
    if (data[i] <= 1) {
      buff = [1];
      buff.push(data[i]);
      while (data[++i] <= 1) {
        buff.push(data[i]);
      }
      count = parseInt(buff.join(''), 2);
      while (count--) res.push(0);
      continue;
    }

    if (data[i] === 0xff) {
      if (data[i + 1] === 0) {
        res.push(0xfe);
      } else if (data[i + 1] === 1) {
        res.push(0xff);
      }
      i += 1;
      continue;
    }

    res.push(data[i] - 1);
  }

  return res;
};

module.exports = ZRLE;
