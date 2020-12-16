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
      <p>div01</p>
    </div>
    <div style="margin: 0 auto; max-width: 600px; width: 100%">
      <p>div02</p>
    </div>
    <div style="margin: 0 auto; max-width: 600px; width: 100%">
      <p>div03</p>
    </div>
  `;
  const renderedHtml = await renderToString(myHtml);
  return renderedHtml.replace(/(\r\n|\n|\r)/gm, '');
}
