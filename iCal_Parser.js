var fs = require('fs');

var myArgs = process.argv.slice(2);

var fileToParse = myArgs[0];


fs.readFile(fileToParse, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  
  analyzer = new VpfParser();
  analyzer.parse(data);
  console.log("fileToParse is a valid vpf file");
  console.log(analyzer.parsedPOI);
  
  for(var idx = 0; idx < analyzer.parsedPOI.length; idx++){
	console.log(analyzer.parsedPOI[idx].name+": "+analyzer.parsedPOI[idx].averageRatings());
  }

});

// POI

var POI = function(nm, lt, lg, r){
	this.name = nm;
	this.lat = lt;
	this.lng = lg;
	this.ratings = r;
}
	
POI.prototype.averageRatings = function(){
		if(this.ratings.length > 0){
			var m = 0.0;
			for(var idx = 0; idx < this.ratings.length; idx++){
				m += parseInt(this.ratings[idx]);
			}
			return (m / this.ratings.length);
		}
		return 0;
	};
	
POI.prototype.addRating = function(rating){
		this.ratings.push(rating);
	};


// VpfParser

var VpfParser = function(){
	// The list of POI parsed from the input file.
	this.parsedPOI = []
	this.symb = ["BEGIN", "VERSION", "PRODID", "BEGIN", "DTSTART", 
				"DTEND", "SUMMARY", "DESCRIPTION", "LOCATION", "END", "END"];

}


// Parser procedure

// tokenize : tranform the data input into a list
// <eol> = CRLF
VpfParser.prototype.tokenize = function(data){
	//return data.split(/(\r\n|: )/);
	var separator = /(\r\n|: )/;
	data = data.split(separator);
	data = data.filter(function(val, idx){ 
						return !val.match(separator); 	
					});
	return data;
}

// parse : analyze data by calling the first non terminal rule of the grammar
VpfParser.prototype.parse = function(data){
	var tData = this.tokenize(data);
	console.log(tData);
	this.listPoi(tData);
}

// Parser operand

VpfParser.prototype.err = function(msg, input){
	console.log("Parsing Error ! on "+input[0]+" -- msg : "+msg);
	process.exit(0);
}

// Read and return a symbol from input
VpfParser.prototype.next = function(input){
	var curS = input.shift();
	//console.log(curS);
	return curS
}

// accept : verify if the arg s is part of the language symbols.
VpfParser.prototype.accept = function(s){
	var idx = this.symb.indexOf(s);
	// index 0 exists
	if(idx === -1){
		this.err("symbol "+s+" unknown", [" "]);
		return false;
	}

	return idx;
}



// check : check whether the arg elt is on the head of the list
VpfParser.prototype.check = function(s, input){
	if(this.accept(input[0]) == this.accept(s)){
		return true;	
	}
	return false;
}

// expect : expect the next symbol to be s.
VpfParser.prototype.expect = function(s, input){
	if(s == this.next(input)){
		console.log("Reckognized! "+s)
		return true;
	}else{
		this.err("symbol "+s+" doesn't match", input);
	}
	return false;
}


// Parser rules

// <liste_poi> = *(<poi>) "$$"
VpfParser.prototype.listPoi = function(input){
	this.poi(input);
	this.expect("$$", input);
}

// <poi> = "START_POI" <eol> <body> <eol> "END_POI"
VpfParser.prototype.poi = function(input){

	if(this.check("START_POI", input)){
		this.expect("START_POI", input);
		var args = this.body(input);
		var p = new POI(args.nm, args.lt, args.lg, []);
		this.note(input, p);
		this.expect("END_POI",input);
		this.parsedPOI.push(p);
		this.poi(input);
		return true;
	}else{
		return false;
	}

}

// <body> = <name> <eol> <latlng> <eol> <optional>
VpfParser.prototype.body = function(input){
	var nm = this.name(input);
	var ltlg = this.latlng(input);
	return { nm: nm, lt: ltlg.lat, lg: ltlg.lng };
}

// <name> = "name: " 1*WCHAR
VpfParser.prototype.name = function(input){
	this.expect("name",input)
	var curS = this.next(input);
	if(matched = curS.match(/[\wàéèêîù'\s]+/i)){
		return matched[0];
	}else{
		this.err("Invalid name", input);
	}
}

// <latlng> = "latlng: " 1*3DIGIT "." 1*DIGIT", " 1*3DIGIT "." 1*DIGIT
VpfParser.prototype.latlng = function(input){
	this.expect("latlng",input)
	var curS = this.next(input);
	if(matched = curS.match(/(\d+(\.\d+)?);(\d+(\.\d+)?)/)){
		return { lat: matched[1], lng: matched[3] };
	}else{
		this.err("Invalid latlng", input);
	}
}

// <optional> = *(<note>)
// <note> = "note: " 1DIGIT
VpfParser.prototype.note = function (input, curPoi){
	if(this.check("note", input)){
		this.expect("note", input);
		var curS = this.next(input);
		if(matched = curS.match(/\d/)){
			curPoi.addRating(matched[0]);
			this.note(input, curPoi);
		}else{
			this.err("Invalid note");
		}	
	}
}

exports.POI = POI;
exports.VpfParser = VpfParser;