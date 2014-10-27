var expect = require('chai').expect;
var SRLE = require('../srle');

describe('SRLE', function(){
  var i;
  var input1 = 'abcdeeeefffffff';
  var output1 = [ 5, 97, 98, 99, 100, 101, 3, 1, 102, 6 ];

  var input2 = new Array(511+1).join('a') + 'b';
  var output2 = [ 1, 97, 255, 255, 0, 1, 98 ];

  var input3 = new Array(73+1).join('abcdefg');
  var output3 = [255];
  for (i = 0; i < 36; i++) { output3 = output3.concat([97,98,99,100,101,102,103]); }
  output3 = output3.concat([97,98,99]);
  output3 = output3.concat([255]);
  for (i = 0; i < 36; i++) { output3 = output3.concat([100,101,102,103,97,98,99]); }
  output3 = output3.concat([100,101,102]);
  output3 = output3.concat([1,103]);

  it('#encode()', function(){
    var o;
    o = SRLE.encode(s2a(input1));
    expect(o).to.eql(output1);

    o = SRLE.encode(s2a(input2));
    expect(o).to.eql(output2);

    o = SRLE.encode(s2a(input3));
    expect(o).to.eql(output3);
  });

  it('#decode()', function(){
    var o;
    o = SRLE.decode(output1);
    expect(a2s(o)).to.eql(input1);

    o = SRLE.decode(output2);
    expect(a2s(o)).to.eql(input2);

    o = SRLE.decode(output3);
    expect(a2s(o)).to.eql(input3);
  });
});

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
