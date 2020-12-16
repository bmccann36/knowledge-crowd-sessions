const RemoveInlineStyle = require('./removeInlineStyle');
const fs = require('fs');
const path = require('path');
const { html, renderToString } = require('@popeindustries/lit-html-server');

let target;

const sampleNlData = fs.readFileSync(path.join(__dirname, 'morning_newsletter.html')).toString();

describe('RemoveInlineStyle', () => {
  beforeEach(() => {
    target = new RemoveInlineStyle();
  });
  it('selects only the html within <td> tag where "id=EMAIL_CONTAINER"', async () => {
    const htmlSample = await getMockNlHtmlDoc();
    console.log(htmlSample);
    // const reformatted = target.selectEmailContainerContent(sampleNlData);
    // fs.writeFileSync(path.join(__dirname, 'htmlResult.html'), reformatted);
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
  return renderToString(myHtml);
}
