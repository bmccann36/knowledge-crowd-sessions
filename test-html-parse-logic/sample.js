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

const $ = cheerio.load(myHtml)

// console.log($('p').html());
const style = $.attr('style');
console.log(style);
