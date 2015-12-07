var fs = require('fs');

var myArgs = process.argv.slice(2);

var fileToParse = myArgs[0];


fs.readFile(fileToParse, 'utf8', function (err,data) 
{
  if (err) 
    return console.log(err);  
  
  analyzer = new veventParser();
  analyzer.parse(data);
  console.log("fileToParse is a valid iCal file");
  console.log(analyzer.parsedvevent);
});


// vevent var
var vevent = function(dtstart, dtend, summary, description, locate)
{
	this.dtstart = dtstart;
	this.dtend = dtend;
	this.summary = summary;
	this.description = description;
	this.locate = locate;
}

// vevent parser
var veventParser = function()
{
	// The list of iCal parsed from the input file.
	this.parsedvevent = []
	this.symb = ["BEGIN", "VERSION", "PRODID", "BEGIN", "DTSTART", 
				"DTEND", "SUMMARY", "DESCRIPTION", "LOCATION", "END", "END"];

}


// Parser procedure

// tokenize : tranform the data input into a list
// <eol> = CRLF
VpfParser.prototype.tokenize = function(data)
{
	//return data.split(/(\r\n|: )/);
	var separator = /(\r\n|:)/;
	data = data.split(separator);
	data = data.filter(function(val, idx){ return !val.match(separator);});
	return data;
}

// parse : analyze data by calling the first non terminal rule of the grammar
veventParser.prototype.parse = function(data)
{
	var tData = this.tokenize(data);
	console.log(tData);
	this.listvevent(tData);
}

// Parser operand

veventParser.prototype.err = function(msg, input)
{
	console.log("Parsing Error ! on " + input[0] + " -- msg : " + msg);
	process.exit(0);
}

// Read and return a symbol from input
veventParser.prototype.next = function(input)
{
	var curS = input.shift();
	//console.log(curS);
	return curS
}

// accept : verify if the arg s is part of the language symbols.
veventParser.prototype.accept = function(s)
{
	var idx = this.symb.indexOf(s);
	// index 0 exists
	if(idx === -1)
	{
		this.err("symbol " + s + " unknown", [" "]);
		return false;
	}
	return idx;
}


// check : check whether the arg elt is on the head of the list
veventParser.prototype.check = function(s, input)
{
	if(this.accept(input[0]) == this.accept(s))
		return true;	
	return false;
}

// expect : expect the next symbol to be s.
veventParser.prototype.expect = function(s, input)
{
	if(s == this.next(input))
	{
		console.log("Reckognized! " + s)
		return true;
	}else
		this.err("symbol " + s + " doesn't match", input);
	return false;
}


// Parser rules

// <liste_vevent> = *(<vevent>) "$$"
veventParser.prototype.listvevent = function(input)
{
	this.vevent(input);
	this.expect("$$", input);
}

// <vevent> = "BEGIN" <eol> <body> <eol> "END"
veventParser.prototype.vevent = function(input)
{

	if(this.check("BEGIN", input))
	{
		this.expect("BEGIN", input);
		var args = this.body(input);
		var p = new iCal(args.dtstart, args.dtend, args.summary, args.description, args.locate, []);
		ajout_pivot(args.dtstart, args.dtend);
		this.note(input, p);
		this.expect("BEGIN",input);
		this.parsedvevent.push(p);
		this.vevent(input);
		return true;
	}else
		return false;
}

// <body> = <dtstart> <eol> <dtend> <eol> <summary> <eol> <description> <eol> <location>
veventParser.prototype.body = function(input)
{

	var dtstart = this.dtstart(input);
	var dtend = this.dtend(input);
	var summary = this.summary(input);
	var description = this.description(input);
	var locate = this.locate(input);
	return { dtstart: dtstart, dtend: dtend, summary: summary, description: description, locate: locate };
}

// <dtstart> = "DTSTART:" 8DIGIT "T" 6DIGIT "Z"
veventParser.prototype.dtstart = function(input)
{
	this.expect("DTSTART",input)
	var curS = this.next(input);
	if(matched = curS.match(/(\d{8})T(\d{6})Z/))
		return matched[0];
	else
		this.err("Invalid dtstart", input);
}

// <dtend> = "DTEND:" 8DIGIT "T" 6DIGIT "Z"
veventParser.prototype.dtend = function(input)
{
	this.expect("DTEND",input)
	var curS = this.next(input);
	if(matched = curS.match(/(\d{8})T(\d{6})Z/))
		return matched[0];
	else
		this.err("Invalid dtend", input);
}

// <summary> = "SUMMARY:" 1*(WSP/VCHAR)
veventParser.prototype.summary = function(input)
{
	this.expect("SUMMARY",input)
	var curS = this.next(input);
	if(matched = curS.match(/(\w)*/))
		return matched[0];
	else
		this.err("Invalid summary", input);
}

// <description> = "DESCRIPTION:" 1*(WSP/VCHAR)
veventParser.prototype.description = function(input)
{
	this.expect("DESCRIPTION",input)
	var curS = this.next(input);
	if(matched = curS.match(/(\w)*/))
		return matched[0];
	else
		this.err("Invalid description", input);
}

// <location> = "LOCATION:" 1*(WSP/VCHAR)
veventParser.prototype.locate = function(input)
{
	this.expect("LOCATION",input)
	var curS = this.next(input);
	if(matched = curS.match(/(\w)*/))
		return matched[0];
	else
		this.err("Invalid location", input);
}

function export_pivot()
//Creer des fichiers aux formats pivots
{
	var EmploiDuTemps = require('emploi_du_temps');
	var edt = new EmploiDuTemps(null);
}


exports.vevent = Vevent;
exports.veventParser = veventParser;
