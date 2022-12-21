const fs = require("fs");
const { parse } = require("csv-parse");


fs.createReadStream("/Users/tomascalle/Desktop/photos/jj.csv")
.pipe(parse({ delimiter: ",", from_line: 2 }))
.on("  Nombres Completos  ", function (row) {
    console.log(row);
})

