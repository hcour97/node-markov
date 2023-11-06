/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov")
const axios = require("axios");
const process = require("process");

/** Make a script, that reads text files and URLS. With output like this: 
 
 * $node makeText.js file eggs.txt
... generated text from file 'eggs.txt' ...

$node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
... generated text from that URL ...

 */

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText())
}

/** Read file and generate text */
function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
        if (err) {
            console.error(`Cannot read file ${path}: ${err}`);
            process.exit(1)
        }
        else {
            generateText(data);
        }
    });
}

/** read URL and generate text */
async function makeURLText(ur) {
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err) {
        console.log(`Cannot read URL: ${url}}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data);
}

/** interpret user input and determine which path to run */
let [method, path] = process.argv.slice(2);

// if file, run makeText
if (method === 'file') {
    makeText(path);
}
// if URL, run makeURLText
if (method === 'url' ) {
    makeURLText(path);
}

// anything else, produce an error:
else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}