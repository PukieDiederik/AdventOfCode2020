const fs = require("fs");
const inputPath = process.argv[2];

if(fs.existsSync(inputPath)){
    fs.readFile(inputPath, (err, data) => {
        if (err) console.log(err);
        else {
            const input = data.toString().split("\r\n").map( element => { return { "row"    : Number.parseInt(element.slice(0,7 ).replace(/F/g, '0').replace(/B/g, '1'), 2), 
                                                                                   "column" : Number.parseInt(element.slice(7,10).replace(/L/g, '0').replace(/R/g, '1'), 2) }});
            let highestSeatId = 0;
            input.forEach(element => {
                const seatId = (element.row * 8) + element.column;
                if (highestSeatId < seatId) highestSeatId = seatId;
            });
            console.log(highestSeatId);
        }
    });
} else console.error("[ERROR] Could not find file specified");