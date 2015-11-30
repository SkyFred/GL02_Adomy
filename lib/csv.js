var file = require('./file');
exports.parseFile = function(filePath) {
	file.parse(filePath, parseLine);
}

function parseLine(line){
	line = line.split(';');
	if(line.length == 8 && line[7] == ''){
		line.pop();
	}
	if(line.length != 7){
		throw new Error('Invalid line: "' + line + '" contains ' + line.length + ' elems, expected 7');
	}
	var ret;
	for (var i = 0, len = line.length; i < len; i++) {
		if(line[i] == 'vide')
			ret = null;
		else
			ret = parseInput(line[i]);
			
		console.log(ret);
	}
}
function parseInput(line) {
	// Expected structure: ”Fonction ’(’ Nom ou Entreprise ')'
	var state = 0; // 0: fonction, 1: start, 2:]end
	var fonction = '';
	var name = '';
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
			name += c;
		}
	}
	if (state != 2) {
		throw new Error('Invalid line: "' + line + '", does not match the Fonction(Name) format');
	}
	//console.log("Fonction: '" + fonction + "'");
	//console.log("Nom: '" + name + "'");
	return [fonction, name];
}