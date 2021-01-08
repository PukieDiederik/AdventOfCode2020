const fs = require("fs");
const inputPath = process.argv[2];

if(fs.existsSync(inputPath)){
    fs.readFile(inputPath, (err, data) => {
        if (err) console.log(err);
        else {
            const surveys = data.toString().split(/\r\n\r\n/g); //split each group
            const surveyGroupSize = surveys.map(survey => survey.match(/\r\n/g) ? survey.match(/\r\n/g).length + 1 : 1); //count amount of people in groups

            let uniqueAnswerAmount = 0; //amount of unique answers in all groups
            let allAnswerAmount = 0; //the amount of questions where everyone in the group said yes

            //calculate all the unique answers
            const uniqueAnswers = surveys.map(survey => {
                let uniqueSet = new Set();
                let i = survey.length;
                while(i--){
                    uniqueSet.add(survey[i]);
                };
                uniqueAnswerAmount += uniqueSet.size;
                return uniqueSet;
            });

            //check the amount of answers that everyone has in their group
            for(let i = 0; i < surveys.length; i++) {
                uniqueAnswers[i].forEach( letter => {
                    allAnswerAmount += surveys[i].match(RegExp(letter, 'g')).length == surveyGroupSize[i];
                });
            }
            
            console.log("Unique answer amount: " + uniqueAnswerAmount);
            console.log("All answer amount: " + allAnswerAmount);
        }
    });
} else console.error("[ERROR] Could not find file specified");