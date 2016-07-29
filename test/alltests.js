var expect = require('chai').expect;
var should = require('chai').should();
var refParser = require('json-schema-ref-parser');

var resolveAllOf = require('../index.js');

describe('JSON schema resolve allof', function() {
  it('should work on primitives', function(){
      resolveAllOf("foo").should.equal("foo");
      resolveAllOf(4).should.equal(4);
      resolveAllOf(3.14159).should.equal(3.14159);
  });
  
  describe('Arrays', function(){
      it('should work on arrays', function(){
          resolveAllOf([1]).should.deep.equal([1]);
          resolveAllOf(["foo"]).should.deep.equal(["foo"]);
      });
      it('should work on empty arrays', function(){
          resolveAllOf([]).should.deep.equal([]);
      });
  });

  describe('Objects', function(){
      it('should work on empty objects', function(){
          resolveAllOf({}).should.deep.equal({});
      });
      it('should work on simple objects', function(){
          resolveAllOf({foo:"bar"}).should.deep.equal({foo:"bar"});
      });
      it('should work on simple allof objects', function(){
          resolveAllOf({foo:"bar"}).should.deep.equal({foo:"bar"});
      });
  });
 
  describe('Composition', function(){
      it('should work on simple composition', function(){
          importedTestCase('./simpleComposition','./simpleComposition-expected');
      });
      
      it('should work on simple composition and complex parsing', function(done){
          importedComplexTestCase('./simpleComposition','./simpleComposition-expected', done);
      });
      
      it('should work with crazy nested composition', function(done){
          importedComplexTestCase('./nestedRefs','./nestedRefs-expected', done);
      });
  });

  
});

function importedTestCase(input, expected){
  var inputobj = require(input);
  var expectedobj = require(expected);
  resolveAllOf(inputobj).should.deep.equal(expectedobj);    
}

function importedComplexTestCase(input, expected, done){
  var inputobj = require(input);
  var expectedobj = require(expected);
  
  refParser.dereference(inputobj)
  .then(function(schema) {
    resolveAllOf(schema).should.deep.equal(expectedobj);
    done();
  })
  .catch(done);

    
}