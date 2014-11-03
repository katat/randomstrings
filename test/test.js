var assert = require('assert');
var RandomStrings = require('../src/api');
var randomStrings = new RandomStrings();
describe('random string generation', function () {
    it('generate alphabets string', function () {
        var str;
        for(var i = 0; i < 1000; i++){
            str = randomStrings.getRandomAlphabets();
        }
        assert.ok(/^(?=.*[a-zA-Z])[a-zA-Z ]+$/.test(str));
    });
    it('generate alphanumeric string', function () {
        var str;
        for(var i = 0; i < 1000; i++){
            str = randomStrings.getRandomAlphaNumeric();
            assert.ok(/^(?=.*\d+)(?=.*[a-zA-Z])[0-9a-zA-Z ]+$/.test(str));
        }
    });
    it('generate integer', function () {
        var str = randomStrings.getRandomInteger();
        assert.ok(/^(?=.*\d)[0-9 ]+$/.test(str));
    });
    it('generate real number', function () {
        var str = randomStrings.getRandomRealNumber();
        assert.ok(/^(?=.*\.)(?=.*\d)[0-9. ]+$/.test(str));
    });
    it('generate objects line', function () {
        var str = randomStrings.generateObjectsLine();
        var objects = str.split(',');
        var types = [];
        objects.forEach(function(obj){
            types.push(randomStrings.determineType(obj));
        });
        types.sort(function(a, b){
            return a - b;
        });
        assert.equal('1234', types.join(''));
    });
    it('parse objects line', function() {
        var objectsLine = '2009766413    , IrpFQAOerXpfOGWIdoAlPpdgOuescApVHBfAbpRLtqerPDxqeEg ,    441045W869  ,    136.43612485119024';
        var objectOutputs = randomStrings.parseObjectsLine(objectsLine);
        assert.equal('2009766413', objectOutputs[0].data);
        assert.equal('integer', objectOutputs[0].type);
        assert.equal('IrpFQAOerXpfOGWIdoAlPpdgOuescApVHBfAbpRLtqerPDxqeEg', objectOutputs[1].data);
        assert.equal('alphabetical strings', objectOutputs[1].type);
        assert.equal('441045W869', objectOutputs[2].data);
        assert.equal('alphanumeric', objectOutputs[2].type);
        assert.equal('136.43612485119024', objectOutputs[3].data);
        assert.equal('real numbers', objectOutputs[3].type);
    });
});
