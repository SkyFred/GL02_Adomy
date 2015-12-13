var file = require('./file');
var fs = require('fs');
var EmploiDuTemps = require('./emploi_du_temps');
var edt = new EmploiDuTemps(null);

exports.parseFile = function (filePath) {
 
    edt.intervenant = filePath.match(/([^\/]*)\/*$/)[1].split('.csv')[0];
    file.parse(filePath, parseLine);
    /*
    fs.writeFile(edt.intervenant + ".edt", edt.intervenant + edt.interventions, function (err) {
        if (err)
            throw err;
    });*/

    return edt;
};

function parseLine(line) {
    line = line.split(';');
    if (line.length == 8 && line[7] == '') {
        line.pop();
    }
    if (line.length != 7) {
        throw 'Invalid line: "' + line + '" contains ' + line.length + ' elems, expected 7';
    }
    var ret;
    for (var i = 0, len = line.length; i < len; i++) {
        var day = Math.floor(i / 48);
        var hour = i % 48;
        if (line[i] == 'vide') {
            ret = null;
        } else {
            var data = parseInput(line[i]);
            //day, time, duration, responsable, lieu) {
            edt.ajouter(day, hour, 1, data[0], data[1]);
        }
    }
}
function parseInput(line) {
    // Expected structure: ”Fonction ’(’ Nom ou Entreprise ')'
    var state = 0; // 0: fonction, 1: start, 2:]end
    var fonction = '';
    var lieu = '';
    for (var i = 0, len = line.length; i < len; i++) {
        var c = line[i];
        if (state == 0) {
            if (c == '(') {
                state = 1;
                continue;
            }
            fonction += c;
        } else if (state == 1) {
            if (c == ')' && i == len - 1) {
                // Final parenthesis
                state = 2;
                continue;
            }
            lieu += c;
        }
    }
    if (state != 2) {
        throw 'Invalid line: "' + line + '", does not match the Fonction(Name) format';
    }
    return [fonction, lieu];
}