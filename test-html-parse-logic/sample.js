const cheerio = require('cheerio');

const html = `<html><head></head><body><div>
      <table width="100%" cellpadding="0">
        <tbody>
          <tr>
            <td style="font-size: 0; line-height: 0">
              <p style="color: #333;font: normal 17px/25px georgia, serif;margin: 0 0 15px;">
                <span style="font-weight: 700; font-size: inherit">And in the U.S.? The number of new cases has risen 51 percent over the
                  past month.</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <table width="100%" cellpadding="0">
        <tbody>
          <tr>
            <td style="font-size: 0; line-height: 0">
              <p style="color: #333;font: normal 17px/25px georgia, serif;margin: 0 0 15px;">
                The causes are not a mystery. The U.S. still lacks a coherent testing
                strategy, and large parts of the country continue to defy basic health
                advice. One example is Mitchell, a small South Dakota city, where deaths
                have spiked recently &#x2014; including the loss of a beloved high school
                coach. Yet anti-mask protesters continue to undermine the local response.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body></html>`;

const $ = cheerio.load(html);

const fontStyle = $('td').attr('style');

const includesFont = fontStyle.includes('font') ? 

console.log(fontStyle);
