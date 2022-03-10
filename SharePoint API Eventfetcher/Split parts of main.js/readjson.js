const fs = require('fs');
fs.readFile('clean.json', 'utf8', (err, data) => {
    if(err) throw err;

    var pdata = JSON.parse(data);
    for(i = 0; i<65535; i++) {
        if(pdata.feed.entry[i]) {
            console.log("Title: " + pdata.feed.entry[i].content[0].m_properties[0].d_Title[0] + ", Event Date: " + pdata.feed.entry[i].content[0].m_properties[0].d_EventDate[0]._);
        }
    }
    
})


//data.feed.entry[3].content[0].m:properties[0].d:Title[0]