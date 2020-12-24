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
    $('div').each(function (i, el) {
      $(el).removeAttr('style');
    });
    $('span').each(function (i, el) {
      $(el).removeAttr('style');
    });
    $('p').each(function (i, el) {
      $(el).removeAttr('style');
    });

    return $.html();
  }

  /**
   * @param {string} inputStyle a string defining styles as input
   */
  removeFontStyleFromStr(inputStyle) {
    // convert inputStyle into an array split by each style attribute
    const newArr = inputStyle.split(';');
    const filteredArr = newArr.filter((el) => {
      if (!el.includes('font')) {
        return el;
      }
    });
    return filteredArr.join('; ') + ';';
  }
}

module.exports = RemoveInlineStyle;
