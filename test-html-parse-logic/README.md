
# Applying Test Driven Development to parsing and manipulating HTML

### Technologies used
- cheerio https://www.npmjs.com/package/cheerio
- lit-html-server https://www.npmjs.com/package/@popeindustries/lit-html-server

getting started with Jest   
https://jestjs.io/docs/en/getting-started

### Instructions 

*big picture* 

We will focus on the code in [removeInlineStyle](./src/removeStyle/removeInlineStyle.js)   
Our objective is to  
1) take a NYT newsletter in HTML format
1) pull out only the newsletter content
1) strip away some of the inline style that causes issues when converting it to an EPUB document

this is the input    
[morning_newsletter](src/removeStyle/morning_newsletter.html)   
this is what we want the output to be    
[expected_final_output](htmlSamples/expected_final_output.html)    
look at the test file (mentioned below) to understand the details of what HTML we want to manipulate

In the file [removeInlineStyle.spec](src/removeStyle/removeInlineStyle.spec.js) you will find some tests written in jest. The first two tests will pass as the code for them is complete. You will need to complete the code to make the tests pass and in some cases also write the tests yourself.


### sample starters 

[sample using lit-html](src/lit-html-sample.js)  
[sample using fs.readfile to read html](src/importAndUseHtml-sample.js)   
[simple sample with jest](src/simple-jest-test.spec.js)