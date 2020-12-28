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
     * iterates over each tbody element and removes the styling of child elements within the tbody
     */
    $('tbody').each((i, el) => {
      // select any "span" element that is inside a tbody element
      $(el).find('span').attr('style', null);
      // set paragraph styles to null
      $(el).find('p').attr('style', null);

      const tdStyle = $(el).find('td').attr('style');
      // remove font size
      if (tdStyle) {
        const newTdStyle = this.removeFontStyles(tdStyle);
        $(el).find('td').attr('style', newTdStyle);
      }

      const ulSpec = $(el).find('ul').attr('style');
      if (ulSpec) {
        const newUlSpec = this.removeFontStyles(ulSpec);
        $(el).find('ul').attr('style', newUlSpec);
      }
    });

    return $.html();
  }

  /**
   *
   * @param styleAttributes string of inline style attributes
   * @returns { filteredStyleAttributes } same style attributes but with any font style removed
   */
  removeFontStyles(styleAttributes) {
    const attrList = styleAttributes.split(';');
    const filtered = attrList.filter((cssProp) => {
      return cssProp.includes('font') == false;
    });
    return filtered.join(';');
  }
}

module.exports = RemoveInlineStyle;
