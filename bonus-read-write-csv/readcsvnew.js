const fs = require("fs");
const {parse} = require('csv-parse');

let csvData = [];
fs.createReadStream('./some.csv')
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
        console.log(`csvrow => `, csvrow);
        csvData.push(csvrow);        
    })
    .on('end',function() {
      console.log('csvData first row => ', csvData[0][0]);
    });