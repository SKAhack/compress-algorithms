var expect = require('chai').expect;
var RLE = require('../rle');

describe('RLE', function(){
  var input = 'nbcdmaaaaa';
  var output = [ 110, 98, 99, 100, 109, 97, 97, 97, 2 ];

  it('#encode()', function(){
    var o = RLE.encode(input);
    expect(o).to.eql(output);
  });

  it('#decode()', function(){
    var o = RLE.decode(output);
    expect(o).to.eql(input);
  });
});
