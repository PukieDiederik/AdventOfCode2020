const fs = require("fs");
const pwPath = "./Inputs/passwords.txt"

fs.readFile(pwPath, (err, data) => {
    if (err) console.log(err);
    else {
        let amountValid = 0;
        data.toString().split('\n').forEach(element => amountValid += IsValid(element));
        console.log("Amount of valid passwords: " + amountValid);
    }
});

function IsValid(element){
    //divide the string up in different parts
    // SE[2] = pw, SE[1][0] = letter
    // SN[0] = least, SN[1] = most
    const splitElement = element.toString().split(' ');
    const splitNumbers = splitElement[0].split('-');
    
    //start checking the string
    let amount = 0; //the amount of the corresponding letters in the pw
    for(let i = 0; i < splitElement[2].length; i++){ amount += splitElement[2][i] == splitElement[1][0]; }

    //return true or false depending on the amount
    return (amount >= Number(splitNumbers[0]) && amount <= Number(splitNumbers[1]));
}