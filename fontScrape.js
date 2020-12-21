const axios = require("axios")
const cheerio = require('cheerio')


const html = axios.get("https://static.nytimes.com/email-content/CA_sample.html")
        .then(function (response) {
             const html = response.data
            const $ = cheerio.load(html)
            const pTag = $('tbody').find('p')
            const styleAttr = pTag.attr('style')
            console.log(styleAttr)
console.log('styleAttr :>> ', styleAttr)
            // console.log('promise-resolved')
            // return response.data
        })
        .catch(function (error) {
            // console.log(error)
        })
// console.log(typeof html)





       
 






 



