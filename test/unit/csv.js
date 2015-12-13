QUnit.module("Module C - CSV");
var csv = require('../../lib/csv');

test("should work without throwing any error", function () {
    csv.parseFile(__dirname + '/../data/sample.csv');
    ok(!0);
});

test("should fail, this is ics.", function () {
    throws(function () {
        csv.parseFile(__dirname + '/../data/sample.ics')
    }, /expected/, 'Fail');
});