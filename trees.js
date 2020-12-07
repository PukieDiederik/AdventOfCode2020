const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const fs = require("fs");
const pwPath = "./Inputs/treesInput.txt"

fs.readFile(pwPath, (err, data) => {
    if (err) console.log(err);
    else {
        let treeAmount = 0;
        //split the lines
        const lines = data.toString().split('\n');
        const width = lines[0].length;
        //walk through each line
        for(let i = 0; i < lines.length; i++){
            if(lines[i][(i*3) % (width - 1)] =='#') treeAmount++;
        }
        console.log(treeAmount);
    }
});