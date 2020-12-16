const cheerio = require('cheerio');

class RemoveInlineStyle {
  constructor() {}

  selectEmailContainerContent(nlHtmlString) {
    // load data into cheerio parser
    const $ = cheerio.load(nlHtmlString);
    // select only the content container with the newsletter content
    const emailContent = $('td[id="EMAIL_CONTAINER"]').html();
    return emailContent;
  }
}

module.exports = RemoveInlineStyle;
