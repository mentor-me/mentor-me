var ADJECTIVES = [
    'Abrasive', 'Brash'
];

var FIRST_NAMES = [
    'Anna', 'Tom'
];

var LAST_NAMES = [
    'Anchorage', 'Berlin'
];

function randomUsername() {
    function rando(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }
    return rando(ADJECTIVES) + rando(FIRST_NAMES) + rando(LAST_NAMES);
}

module.exports = randomUsername;
