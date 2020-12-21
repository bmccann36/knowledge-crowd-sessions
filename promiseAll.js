const axios = require("axios");

function getNytData(urlStr) {
  return axios.get(urlStr).then((res) => res.data);
}
const urlsToGet = [
  "https://static.nytimes.com/email-content/AUST_sample.html",
  "https://static.nytimes.com/email-content/CA_sample.html",
];
const pendingPages = urlsToGet.map((url) => {
  return getNytData(url);
});
// will logout [ Promise { <pending> }, Promise { <pending> } ]
console.log(pendingPages);
