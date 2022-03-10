var fs = require('fs');
var xml2js = require('xml2js');
fs.readFile('xml.xml', 'utf8', (err, data) => {
    if(err) {
        throw err;
        return;
    }
    xml2js.parseString(data, (err, result) => {
        if(err) {
            throw err;
            return;
        }
        const json = JSON.stringify(result, null, 4);
        fs.writeFile('raw.json', json, err => {
            if(err) throw err;
        }) 
    });
});