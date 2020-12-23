const fs = require("fs");
const inputPath = process.argv[2];

if(fs.existsSync(inputPath)){
    fs.readFile(inputPath, (err, data) => {
        if (err) console.log(err);
        else {
            const passports = data.toString().split("\n\r\n").map((element) => {return element.replace(/\n/g, ' ').replace(/\r/g, '')}); //split and parse the passports ("remove \n & \r")
            const reqFields = [/byr\:/i, /iyr\:/i, /eyr\:/i, /hgt\:/i, /hcl\:/i, /ecl\:/i, /pid\:/i]; //all the things it needs to match
            
            let correctPassports = 0; //the amount of correct passports
            passports.forEach((passport) => {
                let amountOfFields = 0;
                reqFields.forEach((field) => { const matches = passport.match(field); //create an array of all the matches (just to make sure there is only one)
                                               amountOfFields += matches ? matches.length == 1 : 0; }); //only add one if there is only 1 match to the amount of fields
                correctPassports += amountOfFields == reqFields.length; //consider it a valid passport if it has the correct number of fields
            });
            console.log(`${correctPassports} passports are correct`);
        }
    });
} else console.error("[ERROR] Could not find file specified");
