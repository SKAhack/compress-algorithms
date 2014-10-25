var expect = require('chai').expect;
var BWT = require('../bwt');
var MTF = require('../mtf');

describe('MTF', function(){
  var input = 'nbcdefghijklmaaaaaaaaaaaaa';
  var output = [110, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  it('#encode()', function(){
    var o = MTF.encode(input);
    expect(o).to.eql(output);
  });

  it('#decode()', function(){
    var o = MTF.decode(output);
    expect(o).to.equal(input);
  });
});
