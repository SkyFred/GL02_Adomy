QUnit.module("Module D - File");
var file = require('../../lib/file');

test("should call the callback N times", function (assert) {
    expect(48);
    file.parse(__dirname + '/../data/sample.csv', function () {
        "use strict";
        ok(true);
    });
});