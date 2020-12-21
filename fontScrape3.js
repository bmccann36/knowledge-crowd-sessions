const axios = require("axios");
const cheerio = require("cheerio");

const html = axios
  .get("https://static.nytimes.com/email-content/CA_sample.html")
  .then((response) => parseHtml(response.data));

function parseHtml(htmlData) {
  const $ = cheerio.load(htmlData);
  const pTag = $("tbody").find("p");
  const styleAttr = pTag.attr("style");
  console.log(styleAttr);
  console.log("styleAttr :>> ", styleAttr);
}
