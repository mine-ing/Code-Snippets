const fs = require("fs");
const legalChar = ['"', "s", "p", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var isLegalChar = false;
fs.readFile('raw.json', 'utf8', (err, data) => {
    if(err) throw err;
    else {
        for(let i = 0; i<data.length; i++) {
            if(data.charAt(i) == ':') {
                console.log("found a colon at " + i);
                isLegalChar = false;
                for(let g = 0; g<13; g++) {
                    if(data.charAt(i-1) == legalChar[g]){
                        isLegalChar = true;
                        if(g == 1 && data.charAt(i-2) != 'p') isLegalChar = false;
                    }
                }
                if(!isLegalChar) {
                    console.log("is an illegal colon, previous char: " + data.charAt(i-1) + " at index " + i + ".");
                    data = data.replacew(i, "_");                
                }
            }
        }
        fs.writeFile('clean.json', data, err => {if(err) throw err;});
    }
});
String.prototype.replacew = function(index, str) {
    return this.substr(0, index) + str + this.substr(index + str.length);
}

/*

Problem:
Colons in URLs, Times, Attribute Names and as Control Characters

Want: NO Colons in Attribute names

The Check: if char before : is either ", http, https or a number, keep it
if not, replace : with _ 

*/