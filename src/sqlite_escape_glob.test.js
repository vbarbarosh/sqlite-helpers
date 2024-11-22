const assert = require('assert');
const sqlite_escape_glob = require('./sqlite_escape_glob');

const items = [
    ['[[]', '['],
    ['[]]', ']'],
    ['[*]', '*'],
    ['[?]', '?'],
];

describe('sqlite_escape_glob', function () {
    items.forEach(function ([expected, input]) {
        it(`${input} → ${expected}`, function () {
            assert.equal(sqlite_escape_glob(input), expected);
        });
    });
});
