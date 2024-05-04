const argv = process.argv;
let path = argv[2];

const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        else {
            console.log(data);
        }
    });
}

async function webCat(path) {
    try {
        let response = await axios.get(path);
        console.log(response.data);
    }
    catch {
        console.error("Could not fetch url")
    }
}

if (path.slice(0, 4) === 'http') {
    webCat(path);
}
else {
    cat(path);
}

