var fs = require('fs');
var EmploiDuTemps = require('./emploi_du_temps');
var edt = new EmploiDuTemps(null);

exports.parseFile = function (fileToParse) {
    
    var data = fs.readFileSync(fileToParse, 'utf8', function (err, data) {
        if (err)
            throw err;      
        /*
        fs.writeFile(edt.intervenant + ".edt", edt.intervenant + edt.interventions, function (err) {
            if (err)
                throw err;
        });*/
    });
    analyzer = new veventParser();
    analyzer.parse(data);
    edt.intervenant = (fileToParse.match(/([^\/]*)\/*$/)[1].split('.ics')[0]);
    return edt;

     
};


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
veventParser.prototype.tokenize = function (data) {
    var separator = /(&|\n\r|\n|:)/;
    data = data.split(separator);

    data = data.filter(function (val, idx) {
        return !val.match(separator);
    });

    return data;
};

// parse : analyze data by calling the first non terminal rule of the grammar
veventParser.prototype.parse = function (data) {
    var tData = this.tokenize(data);
    //console.log(tData);
    this.listvevent(tData);
};

// Parser operand

veventParser.prototype.err = function (msg, input) {
    throw "Parsing Error ! on " + input[0] + " -- msg : " + msg;
};

// Read and return a symbol from input
veventParser.prototype.next = function (input) {
    return input.shift();
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
    return this.accept(input[0]) == this.accept(s);

};

// expect : expect the next symbol to be s.
veventParser.prototype.expect = function (s, input) {
    if (s == this.next(input)) {
        // console.log("Recognized! " + s);
        return true;
    } else
        this.err("symbol " + s + " doesn't match", input);
    return false;
};


// Parser rules

// <liste_vevent> = *(<vevent>) "$$"
veventParser.prototype.listvevent = function (input) {
    input.shift();
    input.shift();
    input.shift();
    input.shift();
    input.shift();
    input.shift();
    this.vevent(input);
    this.expect("END", input);
};

// <vevent> = "BEGIN" <eol> <body> <eol> "END"
veventParser.prototype.vevent = function (input) {

    if (this.check("BEGIN", input)) {
        input.shift();
        input.shift();
        var args = this.body(input);
        var p = new vevent(args.dtstart, args.dtend, args.summary, args.description, args.locate, []);

        this.parsedvevent.push(p);
        this.vevent(input);
        return true;
    } else
        return false;
};

// <body> = <dtstart> <eol> <dtend> <eol> <summary> <eol> <description> <eol> <location>
veventParser.prototype.body = function (input) {
    var dtstart = this.dtstart(input);
    var dtend = this.dtend(input);
    var summary = this.summary(input);
    var description = this.description(input);
    var day = parseInt(dtstart[6]) * 10 + parseInt(dtstart[7]) % 7;//On récupère le jour de début
    var dayf = parseInt(dtend[6]) * 10 + parseInt(dtend[7]) % 7;//On récupère le jour de fin
    var time = (parseInt(dtstart[9]) * 10 + parseInt(dtstart[10])) * 2;//On récupère l'heure de début
    var timef = (parseInt(dtend[9]) * 10 + parseInt(dtend[10])) * 2;//On récupère l'heure de fin
    //On rajoute les demi-heures si besoin
    if (parseInt(dtstart[11]) >= 3)
        ++time;
    if (parseInt(dtend[11]) >= 3)
        ++timef;
    var duration = (dayf - day) * 48 + timef + 48 - time; //On calcule la durée de l'intervention
    var locate = this.locate(input);
    edt.ajouter(day, time, duration, edt.intervenant, locate);
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
    if (matched = curS.match(/(\w|\W)*/))
        return matched[0];
    else
        this.err("Invalid summary", input);
};

// <description> = "DESCRIPTION:" 1*(WSP/VCHAR) "&" 1*(WSP/VCHAR)
veventParser.prototype.description = function (input) {
    this.expect("DESCRIPTION", input);
    edt.intervenant = this.next(input);
    var curS = edt.intervenant + "&" + this.next(input);
    if (matched = curS.match(/(\w|\W)*/))
        return matched[0];
    else
        this.err("Invalid description", input);
};

// <location> = "LOCATION:" 1*(WSP/VCHAR)
veventParser.prototype.locate = function (input) {
    this.expect("LOCATION", input);
    var curS = this.next(input);
    if (matched = curS.match(/(\w|\W)*/))
        return matched[0];
    else
        this.err("Invalid location", input);
};

exports.vevent = vevent;
exports.veventParser = veventParser;
