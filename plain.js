const fs = require("fs");
const inputPath = process.argv[2];

if(fs.existsSync(inputPath)){
    fs.readFile(inputPath, (err, data) => {
        if (err) console.log(err);
        else {
            const seatIds = data.toString().split("\r\n").map( element => Number.parseInt(element.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2));
            seatIds.sort((a,b)  => a - b); //sort for easy searching and figuring out the highest/lowest

            //look for the missing seat
            for(let i = 1; i < seatIds.length; i++){ if(seatIds[i] != i + seatIds[0]) { console.log("missing seatId: " + (i + seatIds[0])); break; } }

            //print the highest and lowest seat
            console.log("lowest SeatId: " +  seatIds[0]);
            console.log("highest SeatId: " + seatIds[seatIds.length - 1]);
        }
    });
} else console.error("[ERROR] Could not find file specified");