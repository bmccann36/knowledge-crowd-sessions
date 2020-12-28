const RemoveInlineStyle = require('./removeInlineStyle');
const fs = require('fs');
const path = require('path');
const { html, renderToString } = require('@popeindustries/lit-html-server');
const cheerio = require('cheerio');

let target;

/**
 * If we want to test our code with a real newsletter input we can import the file here
 * and then load the html string into memory. The variable "sampleNLData" is identical to what
 * we would get from response.data if we were to get the page with axios
 */
const sampleNlData = fs
  .readFileSync(path.join(__dirname, 'morning_newsletter.html'))
  .toString();
const contentOnlySample = fs
  .readFileSync(path.join(__dirname, '..', '..', 'htmlSamples/email_content_only.html'))
  .toString();

describe('RemoveInlineStyle', () => {
  beforeEach(() => {
    target = new RemoveInlineStyle();
  });
  it('selects only the html within <td> tag where "id=EMAIL_CONTAINER"', async () => {
    //? SETUP
    const htmlSample = await getMockNlHtmlDoc();
    //? ACT
    const selectedContent = target.selectEmailContainerContent(htmlSample);
    // if you want to pass in the full actual html newsletter
    // const selectedContent = target.selectEmailContainerContent(sampleNlData);
    //? ASSERT
    const $ = cheerio.load(selectedContent); // load the output
    const divContents = $('div').text(); // get contents of div
    expect(divContents).toBe('TEST DIV WITH CONTENT');
    //? use the fs.writeFile line below if you want to write the result to a file anc check it out
    // fs.writeFileSync(path.join(__dirname, '..', '..', 'htmlSamples/email_content_only.html'), selectedContent);
  });

  it('removes ALL style from all the divs', async () => {
    // const emailContentHtmlSample = await getMockEmailContent();
    const unstyledResult = target.removeAllStyles(contentOnlySample);
    // console.log(unstyledResult);
    const $ = cheerio.load(unstyledResult);
    $('div').each((i, el) => {
      const divStyle = $(el).attr('style');
      expect(divStyle).toBe(undefined);
    });
    fs.writeFileSync(
      path.join(__dirname, '..', '..', 'htmlSamples', 'div_style_removed.html'),
      unstyledResult,
    );
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
    // fs.writeFileSync(
    //   path.join(__dirname, '..', '..', 'htmlSamples', 'span_style_removed.html'),
    //   unstyledResult,
    // );
  });
  it('removes any font styling from "td" rows than are within a "tbody" element', async () => {
    const emailContentHtmlSample = await getMockEmailContent();
    const unstyledResult = target.removeAllStyles(emailContentHtmlSample);
    const $ = cheerio.load(unstyledResult);
    $('tbody').each((i, tbodyEl) => {
      const tdStyle = $(tbodyEl).find('td').attr('style');
      expect(tdStyle).toBe(' line-height: 0');
    });
  });

  it('removes any font styling from "ul" rows than are within a "tbody" element', async () => {
    const emailContentHtmlSample = await getMockContentWithList();
    const unstyledResult = target.removeAllStyles(emailContentHtmlSample);
    const $ = cheerio.load(unstyledResult);
    $('tbody').each((i, tbodyEl) => {
      const ulStyle = $(tbodyEl).find('ul').attr('style');
      expect(ulStyle).toBe('color: #333;text-align: left;padding-left: 50px;');
    });
    // fs.writeFileSync(
    //   path.join(__dirname, '..', '..', 'htmlSamples', 'ul_style_removed.html'),
    //   unstyledResult,
    // );
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
            <td style="font-size: 0; line-height: 0">
              <p
                style="color: #333;font: normal 17px/25px georgia, serif;margin: 0 0 15px;"
              >
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
            <td style="font-size: 0; line-height: 0">
              <p
                style="color: #333;font: normal 17px/25px georgia, serif;margin: 0 0 15px;"
              >
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
  // the lit-html package gives us a method "renderToString" which we use to transofrm the template literal with "html" tag into a string
  const renderedHtml = await renderToString(myHtml);
  return renderedHtml;
}
async function getMockContentWithList() {
  const htmlWithList = html`
    <div style="margin: 0 auto; max-width: 600px; width: 100%">
      <table width="100%" cellpadding="0">
        <tbody>
          <tr>
            <td style="padding: 0 0 5px">
              <ul
                class="css-vhya8o e1darl2c0"
                style="color: #333;font: 10px georgia, serif;text-align: left;padding-left: 50px;"
              >
                <li
                  class="css-11scvta e1y8brq21"
                  style="line-height: 27.5px; margin: 0 0 10px 0"
                >
                  <span> come content.... </span>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin: 0 auto; max-width: 600px; width: 100%">
      <table width="100%" cellpadding="0">
        <tbody>
          <tr>
            <td style="padding: 0 0 5px">
              <ul
                class="css-vhya8o e1darl2c0"
                style="color: #333;font: 10px georgia, serif;text-align: left;padding-left: 50px;"
              >
                <li
                  class="css-11scvta e1y8brq21"
                  style="line-height: 27.5px; margin: 0 0 10px 0"
                >
                  <span> some OTHER content.... </span>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  const renderedHtml = await renderToString(htmlWithList);
  return renderedHtml;
}
