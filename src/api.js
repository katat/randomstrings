var fs = require('fs');
module.exports = function() {
    var types = {
        '1' : 'alphabetical strings',
        '2' : 'alphanumeric',
        '3' : 'integer',
        '4' : 'real numbers'
    };
    function randomChars(chars) {
        var result = '';
        var randomLength = (Math.floor(Math.random()*10));
        var length = chars.length % randomLength + (chars.length - randomLength);
        if(!length){
            length = 1;
        }
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }
    function randomRealNumber(isInt) {
        var realNumber = Math.random() * (Math.pow(10, Math.random()*10));
        if(isInt){
            return Math.floor(realNumber);
        }
        return realNumber;
    }
    function shuffleString(str) {
        var a = str.split('');
        var n = a.length;
        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join('');
    }
    function mixSpaces(str) {
        var spaces = Math.random() * 10;
        var prefix = spaces * Math.random();
        var suffix = spaces - prefix;
        for(var i=0;i<prefix;i++){
            str = ' ' + str;
        }
        for(var j=0;j<suffix;j++){
            str = str + ' ';
        }
        return str;
    }
    function determineType(str) {
        if(/^(?=.*[a-zA-Z])[a-zA-Z ]+$/.test(str)){
            return 1;
        }
        if(/^(?=.*\d+)(?=.*[a-zA-Z])[0-9a-zA-Z ]+$/.test(str)){
            return 2;
        }
        if(/^(?=.*\d)[0-9 ]+$/.test(str)){
            return 3;
        }
        if(/^(?=.*\.)(?=.*\d)[0-9. ]+$/.test(str)){
            return 4;
        }
    }
    function parseObjectsLine(str) {
        var objectStrings = str.split(',');
        var objects = [];
        objectStrings.forEach(function(objStr){
            objects.push({
                data: objStr.trim(),
                type: types[determineType(objStr)]
            });
        });
        return objects;
    }
    function getRandomAlphabets() {
        return mixSpaces(randomChars('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    }
    function getRandomAlphaNumeric() {
        var alphabets = randomChars('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        var numbers = randomChars('0123456789');
        return mixSpaces(shuffleString(numbers+alphabets));
    }
    function getRandomInteger() {
        return mixSpaces(randomRealNumber(true));
    }
    function getRandomRealNumber() {
        return mixSpaces(randomRealNumber());
    }
    function generateObjectsLine() {
        var objectsOrder = shuffleString('1234');
        var objects = [];
        for(var i=0;i<objectsOrder.length;i++){
            if(objectsOrder[i] === '1'){
                objects.push(getRandomAlphabets());
            }
            if(objectsOrder[i] === '2'){
                objects.push(getRandomAlphaNumeric());
            }
            if(objectsOrder[i] === '3'){
                objects.push(getRandomInteger());
            }
            if(objectsOrder[i] === '4'){
                objects.push(getRandomRealNumber());
            }
        }
        return objects.join(',');
    }
    function createRandomObjectsFile() {
        fs.writeFile('output.txt', '', function(err){
            if(err) return console.error('error creating output.txt file');
            appendRandomObjectsToFile();
        });
    }
    function appendRandomObjectsToFile() {
        var lines = [];
        for(var i =0;i<100;i++){
            lines.push(generateObjectsLine());
        }
        fs.appendFile('output.txt', lines.join(','), function(err){
            if(err) return console.error('error creating file', err);
            fs.stat('output.txt', function(err, stats){
                if(stats.size < 10000000){
                    return appendRandomObjectsToFile();
                }
                console.log('success creating output.txt file');
            });
        });
    }
    function readRandomObjectsFile() {
        fs.readFile('output.txt', {encoding: 'utf8'}, function(err, data){
            if(err) return console.error('error reading output.txt file');
            if(data){
                var objects = parseObjectsLine(data);
                objects.forEach(function(obj){
                    console.info(obj.data + ' - ' + obj.type);
                });
            }
        });
    }

    return {
        getRandomAlphabets: getRandomAlphabets,
        getRandomAlphaNumeric: getRandomAlphaNumeric,
        getRandomInteger: getRandomInteger,
        getRandomRealNumber: getRandomRealNumber,
        generateObjectsLine: generateObjectsLine,
        determineType: determineType,
        parseObjectsLine: parseObjectsLine,
        createRandomObjectsFile: createRandomObjectsFile,
        readRandomObjectsFile: readRandomObjectsFile
    };
};