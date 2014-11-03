var RandomStrings = require('./api');
var randomStrings = new RandomStrings();

var args = process.argv.slice(2);
if(args[0] === 'generate'){
    randomStrings.createRandomObjectsFile();
}
if(args[0] === 'read'){
    randomStrings.readRandomObjectsFile();
}