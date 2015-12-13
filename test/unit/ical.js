QUnit.module("Module B - iCal");


test("should work without throwing any error", function () {
    expect(0);
    var ical = require('../../lib/ical_Parser.js');
    //ical.parseFile(__dirname + '/../data/sample.ics');
});

test("should fail, this is csv", function () {
    throws(function () {
        var ical = require('../../lib/ical_Parser.js');
        //ical.parseFile(__dirname + '/../data/sample.csv');
        throw 'error ...';
    }, 'should fail');
});