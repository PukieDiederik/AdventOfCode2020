const { Console } = require("console");
const fs = require("fs");
const numFilePath = "./Inputs/pairs2020input.txt";
const reqVal = 2020; //the number I need to get

fs.readFile(numFilePath, (err, data) => {
    if(err) console.log(err); //check if there are any errors reading the file
    else { //start analyzing the data
        //parse the data and sort it in ascending order
        const numbers = data.toString().split('\n').map(Number).sort((a, b) => { return a-b; });
        //pointers
        let pointerLow = 0;
        let pointerHigh = numbers.length - 1;
        let base = 0;

        let val = reqVal + 1; //make it so val doesnt start out as reqval
        while(reqVal != val && base < numbers.length){

            while(val != reqVal || pointerHigh < pointerLow){
                //if the high or low pointers are the same as the base skip this itteration
                if      (pointerHigh == base) pointerHigh--;
                else if (pointerLow  == base) pointerLow++;
                else { //if high and low pointers are different
                    val = numbers[base] + numbers[pointerLow] + numbers[pointerHigh];
                    if (val == reqVal) { console.log(`found a match: ${numbers[base]} + ${numbers[pointerLow]} + ${numbers[pointerHigh]}`);}
                    else if (val > reqVal) { pointerHigh--; }
                    else if (val < reqVal) { pointerLow++;}
                }
            }
            if(val != reqVal) base++; //increase the base value if no match was found
        }
        if (val != reqVal) console.log("couldn't find a pair that adds up to " + reqVal);
    }
});