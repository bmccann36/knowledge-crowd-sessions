const RemoveInlineStyle = require('./removeInlineStyle');
const fs = require('fs');
const path = require('path');
const { html, renderToString } = require('@popeindustries/lit-html-server');
const cheerio = require('cheerio');

let target;

//? FOR TESTING
const sampleNlData = fs
  .readFileSync(path.join(__dirname, 'morning_newsletter.html'))
  .toString();
const contentOnlySample = fs
  .readFileSync(path.join(__dirname, 'email_content_only.html'))
  .toString();

describe('RemoveInlineStyle', () => {
  beforeEach(() => {
    target = new RemoveInlineStyle();
  });
  it('selects only the html within <td> tag where "id=EMAIL_CONTAINER"', async () => {
    const htmlSample = await getMockNlHtmlDoc();
    const selectedContent = target.selectEmailContainerContent(htmlSample);
    const $ = cheerio.load(selectedContent); // load the output
    const divContents = $('div').text(); // get contents of div
    expect(divContents).toBe('TEST DIV WITH CONTENT');
    //? to write to file when we want
    // fs.writeFileSync(path.join(__dirname, 'email_content_only.html'), selectedContent);
  });

  it('removes ALL style from all the divs', async () => {
    const emailContentHtmlSample = await getMockEmailContent();
    const unstyledResult = target.removeAllStyles(emailContentHtmlSample);
    // console.log(unstyledResult);
    const $ = cheerio.load(unstyledResult);
    $('div').each((i, el) => {
      const divStyle = $(el).attr('style');
      expect(divStyle).toBe(undefined);
    });
    // fs.writeFileSync(path.join(__dirname, 'div_style_removed.html'), unstyledResult);
  });

  it('removes ALL style from all the spans', async () => {
    const emailContentHtmlSample = await getMockEmailContent();
    const unstyledResult = target.removeAllStyles(emailContentHtmlSample);
    // console.log(unstyledResult);
    const $ = cheerio.load(unstyledResult);
    $('span').each((i, el) => {
      const spanStyle = $(el).attr('style');
      expect(spanStyle).toBe(undefined);
    });
    // fs.writeFileSync(path.join(__dirname, 'span_style_removed.html'), unstyledResult);
  });
});

async function getMockNlHtmlDoc() {
  const myHtml = html`
    <!DOCTYPE html>
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <title>"some sample title"</title>
      </head>
      <body>
        <div>
          <table>
            <tbody>
              <tr>
                <td id="EMAIL_CONTAINER" align="left" width="100%">
                  <div>TEST DIV WITH CONTENT</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `;
  const renderedHtml = await renderToString(myHtml);
  return renderedHtml.replace(/(\r\n|\n|\r)/gm, '');
}
async function getMockEmailContent() {
  const myHtml = html`
    <div style="margin: 0 auto; max-width: 600px; width: 100%">
      <table width="100%" cellpadding="0">
        <tbody>
          <tr>
            <td align="left">
              <p style="color: #333;font: normal 17px/25px georgia, serif;margin: 0 0 15px;" >
                <span style="font-weight: 700; font-size: inherit"
                  >And in the U.S.? The number of new cases has risen 51 percent over the
                  past month.</span
                >
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin: 0 auto; max-width: 600px; width: 100%">
      <table width="100%" cellpadding="0">
        <tbody>
          <tr>
            <td align="left">
              <p style="color: #333;font: normal 17px/25px georgia, serif;margin: 0 0 15px;" >
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
  `;
  const renderedHtml = await renderToString(myHtml);
  return renderedHtml.replace(/(\r\n|\n|\r)/gm, '');
}
