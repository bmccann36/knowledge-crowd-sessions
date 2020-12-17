const cheerio = require('cheerio');

class RemoveInlineStyle {
  constructor() {}

  /**
   * select only the content of the <td> tag with id EMAIL_CONTAINER and returns its html content
   * @param {string} nlHtmlString
   * @return {string} contents of EMAIL_CONTAINER td tag
   */
  selectEmailContainerContent(nlHtmlString) {
    // load data into cheerio parser
    const $ = cheerio.load(nlHtmlString);
    // select only the content container with the newsletter content
    const emailContent = $('td[id="EMAIL_CONTAINER"]').html();
    return emailContent;
  }

  /**
   *
   * @param {string} htmlEmailContent
   * @param {string} html with style removed
   */
  removeAllStyles(htmlEmailContent) {
    const $ = cheerio.load(htmlEmailContent);
    // remove div styling
    $('div').each(function (i, el) {
      $(el).attr('style', null);
    });

    /**
     * TODO add in the rest of this function to get the rest of the tests passing
     */

    return $.html();
  }

}

module.exports = RemoveInlineStyle;
