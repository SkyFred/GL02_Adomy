// Sample QUnit module
QUnit.module("Module A - Random");
test("a basic test example", function () {
    ok(true, "this test is fine");
    var value = "hello";
    equal("hello", value, "We expect value to be hello");
});