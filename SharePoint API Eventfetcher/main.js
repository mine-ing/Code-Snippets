const https = require('https');
const fs = require('fs');
const xml2js = require('xml2js');
String.prototype.replaceW = function(index, str) { //Function, that replaces a character with a given character at given index
    return this.substr(0, index) + str + this.substr(index + str.length);
}
const legalChar = ['"', "s", "p", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; //list of characters that come before a : in the output.json
var isLegalChar = false;
https.get('https://USERNAME:PASSWORD@sharepoint.URL.TO/SITE/_api/web/lists/getbytitle(\'CALENDAR_NAME\')/items', (response) => { //make a(n) https request
    let res = '';
    response.on('data', (chunk) =>{ //data comes in packets, wich have to be combined to be further processed
        res += chunk;
    });
    response.on('end', () => { //when all packets have been recieved and the data is still one chunk
        xml2js.parseString(res, (err, rawdata) => { //parse the xml string to a json object
            if(err) throw err;
            var data = JSON.stringify(rawdata, null, 4); //convert the json object into a raw string
            for(let i = 0; i<data.length; i++) { //for each character...
                if(data.charAt(i) == ':') { //...if it is a :...
                    isLegalChar = false;
                    for(let g = 0; g<13; g++) {
                        if(data.charAt(i-1) == legalChar[g]){ //...that is nessecaryfor json syntax, part of time and date or part of a url...
                            isLegalChar = true;
                            if(g == 1 && data.charAt(i-2) != 'p') isLegalChar = false;
                        } //...keep it
                    }
                    if(!isLegalChar) data = data.replaceW(i, "_"); //if that is not the case, replace the illegal : with _
                }
            }
        fs.writeFile('output.json', data, err => {if(err) throw err;}); //write the raw json formatted string to a .json file
        });
    });
}).on("error", (err) =>{if(err) throw(err);});
