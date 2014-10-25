var expect = require('chai').expect;
var BWT = require('../bwt');

describe('BWT', function(){
  var input = 'abacadaeafagahaiajakalaman';
  var output = 'nbcdefghijklmaaaaaaaaaaaaa';
  var top = 0;

  it('#encode()', function(){
    var o = BWT.encode(input);
    expect(o.top).to.equal(top);
    expect(o.data).to.equal(output);
  });

  it('#decode()', function(){
    var o = BWT.decode(top, output);

    expect(o).to.equal(input);
  });
});
