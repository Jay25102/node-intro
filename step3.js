const argv = process.argv;
let path = argv[2];
let outArg = argv[3];
let outFile = argv[4];

const fs = require('fs');
const axios = require('axios');

function writeOut(data) {
    fs.writeFile(outFile, data, 'utf8', function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        else {
            console.log("Writting to file");
        }
    });
}

function cat(path, outArg) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        else {
            if (outArg === "--out") {
                writeOut(data);
            }
            else {
                console.log(data);
            }
        }
    });
}

async function webCat(path, outArg) {
    try {
        let response = await axios.get(path);
        if (outArg === "--out") {
            writeOut(response.data);
        }
        else {
            console.log(response.data);
        }
    }
    catch {
        console.error("Could not fetch url")
    }
    
}

if (path.slice(0, 4) === 'http') {
    webCat(path, outArg);
}
else {
    cat(path, outArg);
}

