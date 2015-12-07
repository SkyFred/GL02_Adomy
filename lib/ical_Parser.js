var fs = require('fs');

var myArgs = process.argv.slice(2);

var fileToParse = myArgs[0];

var EmploiDuTemps = require('emploi_du_temps');
var edt = new EmploiDuTemps(null);


fs.readFile(fileToParse, 'utf8', function (err, data) {
    if (err)
        return console.log(err);

    analyzer = new veventParser();
    analyzer.parse(data);
    console.log("fileToParse is a valid iCal file");
    console.log(analyzer.parsedvevent);
    console.log(edt);
});


// vevent var
var vevent = function (dtstart, dtend, summary, description, locate) {
    this.dtstart = dtstart;
    this.dtend = dtend;
    this.summary = summary;
    this.description = description;
    this.locate = locate;
};

// vevent parser
var veventParser = function () {
    // The list of iCal parsed from the input file.
    this.parsedvevent = [];
    this.symb = ["BEGIN", "VERSION", "PRODID", "BEGIN", "DTSTART",
        "DTEND", "SUMMARY", "DESCRIPTION", "LOCATION", "END", "END"];

};


// Parser procedure

// tokenize : tranform the data input into a list
// <eol> = CRLF
VpfParser.prototype.tokenize = function (data) {
    //return data.split(/(\r\n|: )/);
    var separator = /(&\r\n|:)/;
    data = data.split(separator);
    data = data.filter(function (val, idx) {
        return !val.match(separator);
    });
    return data;
};

// parse : analyze data by calling the first non terminal rule of the grammar
veventParser.prototype.parse = function (data) {
    var tData = this.tokenize(data);
    console.log(tData);
    this.listvevent(tData);
};

// Parser operand

veventParser.prototype.err = function (msg, input) {
    console.log("Parsing Error ! on " + input[0] + " -- msg : " + msg);
    process.exit(0);
};

// Read and return a symbol from input
veventParser.prototype.next = function (input) {
    var curS = input.shift();
    //console.log(curS);
    return curS
};

// accept : verify if the arg s is part of the language symbols.
veventParser.prototype.accept = function (s) {
    var idx = this.symb.indexOf(s);
    // index 0 exists
    if (idx === -1) {
        this.err("symbol " + s + " unknown", [" "]);
        return false;
    }
    return idx;
};


// check : check whether the arg elt is on the head of the list
veventParser.prototype.check = function (s, input) {
    if (this.accept(input[0]) == this.accept(s))
        return true;
    return false;
};

// expect : expect the next symbol to be s.
veventParser.prototype.expect = function (s, input) {
    if (s == this.next(input)) {
        console.log("Reckognized! " + s);
        return true;
    } else
        this.err("symbol " + s + " doesn't match", input);
    return false;
};


// Parser rules

// <liste_vevent> = *(<vevent>) "$$"
veventParser.prototype.listvevent = function (input) {
    this.vevent(input);
    this.expect("$$", input);
};

// <vevent> = "BEGIN" <eol> <body> <eol> "END"
veventParser.prototype.vevent = function (input) {

    if (this.check("BEGIN", input)) {
        this.expect("BEGIN", input);
        var args = this.body(input);
        var p = new iCal(args.dtstart, args.dtend, args.summary, args.description, args.locate, []);
        this.note(input, p);
        this.expect("BEGIN", input);
        this.parsedvevent.push(p);
        this.vevent(input);
        return true;
    } else
        return false;
};

// <body> = <dtstart> <eol> <dtend> <eol> <summary> <eol> <description> <eol> <location>
veventParser.prototype.body = function (input) {
    EmploiDuTemps;
    
    var dtstart = this.dtstart(input);
    var dtend = this.dtend(input);
    var summary = this.summary(input);
    var description = this.description(input);
    var day = parseInt(dtstart[6])*10+parseInt(dtstart[7]);//On récupère le jour de début
    var dayf = parseInt(dtend[6])*10+parseInt(dtend[7]);//On récupère le jour de fin
    var time = (parseInt(dtstart[9])*10+parseInt(dtstart[10]))*2;//On récupère l'heure de début
    var timef = (parseInt(dtend[9])*10+parseInt(dtend[10]))*2;//On récupère l'heure de fin
    //On rajoute les demi-heures si besoin
    if (parseInt(dtstart[11]) >= 3)
        ++time;
    if (parseInt(dtend[11]) >= 3)
        ++timef;
    var duration = (dayf - day)*48 + timef + 48 - time; //On calcule la durée de l'intervention
    var locate = this.locate(input);
    edt.interventions.push(new Intervention(day, time, duration, edt.intervenant, locate));
    return {dtstart: dtstart, dtend: dtend, summary: summary, description: description, locate: locate};
};

// <dtstart> = "DTSTART:" 8DIGIT "T" 6DIGIT "Z"
veventParser.prototype.dtstart = function (input) {
    this.expect("DTSTART", input);
    var curS = this.next(input);
    if (matched = curS.match(/(\d{8})T(\d{6})Z/))
        return matched[0];
    else
        this.err("Invalid dtstart", input);
};

// <dtend> = "DTEND:" 8DIGIT "T" 6DIGIT "Z"
veventParser.prototype.dtend = function (input) {
    this.expect("DTEND", input);
    var curS = this.next(input);
    if (matched = curS.match(/(\d{8})T(\d{6})Z/))
        return matched[0];
    else
        this.err("Invalid dtend", input);
};

// <summary> = "SUMMARY:" 1*(WSP/VCHAR)
veventParser.prototype.summary = function (input) {
    this.expect("SUMMARY", input);
    var curS = this.next(input);
    if (matched = curS.match(/(\w)*/))
        return matched[0];
    else
        this.err("Invalid summary", input);
};

// <description> = "DESCRIPTION:" 1*(WSP/VCHAR) "&" 1*(WSP/VCHAR)
veventParser.prototype.description = function (input) {
    this.expect("DESCRIPTION", input);
    edt.intervenant = this.next(input);
    var curS = this.next(input);
    if (matched = curS.match(/(\w)*/))
        return matched[0];
    else
        this.err("Invalid description", input);
};

// <location> = "LOCATION:" 1*(WSP/VCHAR)
veventParser.prototype.locate = function (input) {
    this.expect("LOCATION", input);
    var curS = this.next(input);
    if (matched = curS.match(/(\w)*/))
        return matched[0];
    else
        this.err("Invalid location", input);
};

exports.vevent = Vevent;
exports.veventParser = veventParser;
