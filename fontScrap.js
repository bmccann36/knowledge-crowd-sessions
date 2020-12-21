const axios = require("axios");
const cheerio = require("cheerio");

async function getAndTransformHtml(url) {
  const axiosResponse = await axios.get(url);
  console.log(axiosResponse);
  const $ = cheerio.load(axiosResponse.data);
  const pTag = $("tbody").find("p");
  const styleAttr = pTag.attr("style");
  console.log(styleAttr);
  console.log("styleAttr :>> ", styleAttr);
}
getAndTransformHtml("https://static.nytimes.com/email-content/CA_sample.html");
getAndTransformHtml(
  "https://static.nytimes.com/email-content/AUST_sample.html"
);
console.log("loading");
