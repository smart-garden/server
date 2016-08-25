module.exports = function hexgenerator(numkeys) {
    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    var numbers = new Array(numkeys);
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = randomIntInc(1, 10).toString(16); // base 16 - hexadecimal format
    }

};
