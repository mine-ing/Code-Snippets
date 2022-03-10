const https = require('https');
const fs = require('fs');
https.get('https://USERNAME:PASSWORD@sharepoint.tuhh.de/sites/fks/_api/web/lists/getbytitle(\'CALENDAR_NAME\')/items', (response) => {
    let data = '';
    response.on('data', (chunk) =>{
        data += chunk;
    });
    response.on('end', () => {
        fs.writeFile('xml.xml', data, err => {
            if(err) throw err;
        }) 
    });
}).on("error", (err) =>{if(err) throw(err);});
