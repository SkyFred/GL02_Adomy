exports.parse = function (filePath, callback) {
    var data = require('fs').readFileSync(filePath, 'utf8');
    data.split("\n").forEach(callback);
};