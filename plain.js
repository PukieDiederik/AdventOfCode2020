const fs = require("fs");
const inputPath = process.argv[2];

if(fs.existsSync(inputPath)){
    fs.readFile(inputPath, (err, data) => {
        if (err) console.log(err);
        else {
            const seatIds = data.toString().split("\r\n").map( element => Number.parseInt(element.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2));

            let highestSeatId = 0;
            seatIds.forEach(id => {
                if (highestSeatId < id) highestSeatId = id;
            });
            console.log(highestSeatId);
        }
    });
} else console.error("[ERROR] Could not find file specified");