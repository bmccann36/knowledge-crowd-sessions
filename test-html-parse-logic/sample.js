const cheerio = require("cheerio");

// const $ = cheerio.load('<h2 class="title">Hello world</h2>');

// $("h2.title").text("Hello there!");
// $("h2").addClass("welcome");

// $.html();

// console.log($.html());
//=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>

const myHtml = `<div style="margin: 0 auto; max-width: 600px; width: 100%">
<table width="100%" cellpadding="0">
  <tbody>
    <tr>
      <td align="left">
        <p style="color: #333; font: normal 17px/25px georgia, serif; margin: 0 0 15px">
          &#x201C;There was a sense that this was a big moment for them personally, for the country at
          large, and sort of for humanity,&#x201D; Megan told me. &#x201C;At the end of the day, a lot of
          things haven&#x2019;t changed for most of us. But certainly for a few thousand people across the
          U.K. tonight, their lives are different.&#x201D;
        </p>
      </td>
    </tr>
  </tbody>
</table>
</div>`

//? select the "style" element of the p tag
const $ = cheerio.load(myHtml)
// console.log(select('tbody').html())
const pTag = $('tbody').find('p')
const styleAttr = pTag.attr('style')
// console.log(styleAttr.split(";"))
// EXAMPLE $ex2('#fruits')..find('li')

const input = [
  'color: #333',
  ' margin: 0 0 15px',
  ' font: normal 17px/25px georgia, serif'
]
// we want to filter out anything that specifies font
// and return as a string
const filteredStyle = input.filter((el)=> !el.includes('font:'))
console.log(filteredStyle)
// now we have the string we want 
const newFontStyle = filteredStyle.join()
// replace the old style attribute with our new one
pTag.attr('style', newFontStyle)

console.log(select('tbody').html())


  // const newUlSpec = ulSpec.replace('font:10px georgia,serif;', '');
  // $(el).find('ul').attr('style', newUlSpec);



const cheerioSample = `
<ul id="fruits">
    <li class="apple">Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
</ul>`

// Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
// const $ex2 = cheerio.load(cheerioSample)
// console.log($ex2('#fruits').find('li').length)
//=> 3