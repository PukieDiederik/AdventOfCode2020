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
    const splitNumbers = splitElement[0].split('-').map(num => Number(num));
    
    //check if either position is correct
    return (splitElement[2][splitNumbers[0] -1] == splitElement[1][0]) ^ (splitElement[2][splitNumbers[1] -1] == splitElement[1][0]);
}