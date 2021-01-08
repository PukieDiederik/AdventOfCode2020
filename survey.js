const fs = require("fs");
const inputPath = process.argv[2];

if(fs.existsSync(inputPath)){
    fs.readFile(inputPath, (err, data) => {
        if (err) console.log(err);
        else {
            const surveys = data.toString().split(/\r\n\r\n/g).map(survey => survey.replace(/\r\n/g, ''));
            let uniqueAnswerAmount = 0;
            const uniqueAnswers = surveys.map(survey => {
                let uniqueSet = new Set();
                let i = survey.length;
                while(i--){
                    uniqueSet.add(survey[i]);
                };
                uniqueAnswerAmount += uniqueSet.size;
                return uniqueSet;
            });

            console.log(uniqueAnswerAmount);
        }
    });
} else console.error("[ERROR] Could not find file specified");