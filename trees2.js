const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const fs = require("fs");
const pwPath = "./Inputs/treesInput.txt"

fs.readFile(pwPath, (err, data) => {
    if (err) console.log(err);
    else {
        const directions = [{"x" : 1,  "y" : 1}, 
                            {"x" : 3,  "y" : 1},
                            {"x" : 5,  "y" : 1},
                            {"x" : 7,  "y" : 1},
                            {"x" : 1,  "y" : 2}]

        //split the lines
        const lines = data.toString().split('\n');
        
        let totalAmount = 1; //the final answer I need
        
        directions.forEach(vector => {
            let treeCounter = 0; //the amount of trees for this specific vector

            //start looping until all the y positions have been checked
            for(let y = 0; y < lines.length; y += vector.y){
                //if the current 'y' at character [(the amount of times this has looped) * x % (width - 1)] is a tree, increment the counter
                if(lines[y][((y / vector.y) * vector.x) % (lines[0].length - 1)] =='#') treeCounter++;
            }
            console.log(`trees for direction: (${vector.x}, ${vector.y}) = ${treeCounter}`);
            totalAmount *= treeCounter;
        });
        console.log("trees multiplied together: " + totalAmount);
    }
});