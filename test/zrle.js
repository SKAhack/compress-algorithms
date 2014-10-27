var expect = require('chai').expect;
var ZRLE = require('../zrle');

describe('ZRLE', function(){
  var i;
  var input1 = [97, 255, 98, 0, 0, 0, 0, 0, 0, 0, 0];
  var output1 = [ 98, 255, 1, 99, 0, 0, 0 ];

  it('#encode()', function(){
    var o;
    o = ZRLE.encode(input1);
    expect(o).to.eql(output1);
  });

  it('#decode()', function(){
    var o;
    o = ZRLE.decode(output1);
    expect(o).to.eql(input1);
  });
});
