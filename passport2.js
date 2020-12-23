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
                //check if it has all the required fields
                let amountOfFields = 0;
                reqFields.forEach((field) => { const matches = passport.match(field); //create an array of all the matches (just to make sure there is only one)
                                               amountOfFields += matches ? matches.length == 1 : 0; }); //only add one if there is only 1 match to the amount of fields
                
                //check if all the fields are correct
                if (amountOfFields == reqFields.length) { //check if it has the correct amount of fields
                    let isValid = 0;
                    fields = passport.split(' ').forEach(field => {
                        const splitField = field.split(':');
                        switch(splitField[0]){
                            case "byr":
                                isValid += IsBetween(Number(splitField[1]), 1920, 2002);
                                break;

                            case "iyr":
                                isValid += IsBetween(Number(splitField[1]), 2010, 2020);
                                break;

                            case "eyr":
                                isValid += IsBetween(Number(splitField[1]), 2020, 2030);
                                break;

                            case "hgt":
                                isValid += (/\d+(in|cm)/i.test(splitField[1]) && splitField[1][splitField[1].length - 1] == 'm' ? IsBetween(Number(splitField[1].match(/\d+(?=cm)/i)), 150, 193) : 
                                                                                                                                  IsBetween(Number(splitField[1].match(/\d+(?=in)/i)), 59, 76));
                                break;

                            case "hcl":
                                isValid += /#([0-9]|[a-f]){6}/i.test(splitField[1]);
                                break;

                            case "ecl":
                                isValid += /amb|blu|brn|gry|grn|hzl|oth/i.test(splitField[1]);
                                break;

                            case "pid":
                                isValid += /^\d{9}$/.test(splitField[1]);
                                break;

                            case "cid": //the challenge doesnt care about cid
                                break;

                            default:
                                console.error("[ERROR] could not identify field name: " + splitField[0]);
                                break;
                        }
                    });
                    correctPassports += isValid == reqFields.length; //if all the [7] fields are valid
                }
            });
            console.log(`${correctPassports} passports are correct`);
        }
    });
} else console.error("[ERROR] Could not find file specified");

function IsBetween(x, min, max){ return Boolean((x-min)*(x-max) <= 0) }