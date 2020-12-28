const chalk = require('chalk');
const cheerio = require('cheerio');
const fs = require('fs');
// the path module comes out of the box with node, it helps us resolve a full path to a file
const path = require('path');
// __dirname tells us where in the filesystem the file we are evaluating is
// will resolve to "<WHATEVER_FOLDER_THIS_PROJECT_IS_IN>/knowledge-crowd-sessions/test-html-parse-logic"
console.log(chalk.yellow('__dirname is: '), __dirname);
/* by using the path module to join together the full name of the directory we are in with the path to the html we want to load
 we get a string that represents the full file path to the file we want
 __dirname = /Users/chylomicronman/git-repos/knowledge-crowd-sessions/test-html-parse-logic
 relative file path = /htmlSamples/sample01.html"
 so... __dirname + relative file path = /Users/chylomicronman/git-repos/knowledge-crowd-sessions/test-html-parse-logic/htmlSamples/sample01.html
*/
const pathToHtml = path.join(__dirname, '..', 'htmlSamples/email_content_only.html');
console.log(chalk.yellow('pathToHtml :>> '), pathToHtml);
// we use the fs module to read the file synchrounously
// note that we could us fs.readFile which is asynchrounous (non blocking) which will force us to use a callback instead
const htmlDataAsBuffer = fs.readFileSync(pathToHtml);

// readFileSync returns a buffer data type, we have to convert it to a string to read it and use it in cheerio
const sampleHtmlAsString = htmlDataAsBuffer.toString();
// print out the first 400 chracters of our html to check it worked
console.log(chalk.yellow('FIRST 400 CHARS OF OUR HTML'));
console.log(sampleHtmlAsString.slice(0, 400));
// now we can use cheerio on the string we imported
const $ = cheerio.load(sampleHtmlAsString);

console.log(chalk.green('use cheerio to select the first anchor tag'));
const element = $(sampleHtmlAsString).find('a').html();
console.log(element);
