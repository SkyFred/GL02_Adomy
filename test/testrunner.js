var testRunner = require("qunit");
var path = require("path");


testRunner.setup({
	log: {
		assertions: false,
		// log expected and actual values for failed tests
		errors: true,
		// log tests overview
		tests: false,
		// log summary
		summary: false,
		// log global summary (all files)
		globalSummary: true,
		// log coverage
		coverage: false,
		// log global coverage (all files)
		globalCoverage: false,
		// log currently testing code file
		testing: false
	}
});

testRunner.run({
	code: path.join(__dirname, "../app.js"),
	tests: path.join(__dirname, "./unit/tests.js")
});