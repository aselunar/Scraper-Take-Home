const axios = require('axios');
const cheerio = require('cheerio');
// importing pretty to make our console logs easier to read.
const pretty = require('pretty');
// importing express to make it easier to accept a request body and return a response.
// const { url } = require('node');

const objOfUrls = {
  'MOCK_INDEMNITY': 'https://scraping-interview.onrender.com/mock_indemnity/',
  'PLACEHOLDER_CARRIER': 'https://scraping-interview.onrender.com/placeholder_carrier/'
}

const Policy = function() {

}

module.exports = {

  scrapify: async (req, res, next) => {
    try{

      const customerAndSiteInput = req.body;
      for (const customer of customerAndSiteInput){
        let site = objOfUrls[customer.carrier];
        let fullUrl = `${site}` + `${customer.customerId}`;
        console.log(fullUrl);
        res.locals[customer] = digestData(fullUrl);
      };
      return next();
    }
    catch {

    }
  }
   

};

async function digestData(carrier){
  const linkCache = new Set();
  const digestedData = {};
  console.log("we here");

  async function followLinks(carrier){
    const $ = await scrape(carrier);
    const ahref = $('a[href]');
    findData($);
    // console.log('ahref', ahref);
    ahref.each((i, el) => {
      // console.log('el', el);
      let link = $(el).attr();
      console.log('link', link);
      if (!linkCache.has(link.href) && link.href !== '#'){
        // findData($);
        console.log("type", link.href);
        linkCache.add(link.href);
        console.log("linkCache", linkCache);
        console.log("carrier", carrier);
        let fullPath = new URL(link.href, carrier);
        let arg = fullPath.href;
        console.log("arg", fullPath);
        followLinks(arg);
      }
    });
  };

  // linkCache.add(carrier);
  await followLinks(carrier);
  // await console.log("linkCache", linkCache);


  async function findData($){
    const policies = new Map();
    // let policy = {};
    const tableHeaders = $('th');
    await tableHeaders.each((i, el) => {
      let header = $(el).text();
      Policy.prototype[header] = null;
      // console.log("header", header);
    });
    console.log(Policy.prototype);
    const policyLength = Object.keys(Policy.prototype).length;
    console.log("length", policyLength);
    const tableRows = $('tr');
    await tableRows.each((i, el) => {
      let length = $(el).children().length;
      if (length === policyLength){
        const newPolicy = new Policy();
        // for (let column of newPolicy){
        //   let index = 0;
          let td = $(el).children().eq(index).text();
        //   console.log("td", td);
        //   newPolicy[column] = td;
        //   // index++;
        // }
        let td = $(el).children();
        td.each((i, el) => {
          newPolicy[i] = el;
        })
        // newPolicy[i] = td;
        console.log("policy", newPolicy);
      }

    })

    // console.log('$.body', $('body > div > table'));
    // $('body > div > table').each((i, el) => {
    //   console.log('el', el);
    //   {
    //     const ths = $(el).find('th');
    //     $(ths).each((i, el) => {
    //       console.log('ths el', el);
    //     })
    //   }
    // })

    // const tableRows = $('body > table > tbody > tr');
    // console.log("tableRows", tableRows);
    // parseTables($, tableRows);

    // const tables = $('table');
    // tables.each((i, el) => {
    //   let tableHeading = $(el).children('th');
    //   tableHeading.each((i, el) => {
    //     let tableHeadingText = el.innerText;
    //     console.log("tableHeadingText", tableHeadingText);
    //   })

    // })
    // function parseTables($, tableRows){
    //   console.log("we parsing");
    //   console.log("tableRows", tableRows);
    //   tableRows.each((i, el) => {
    //     if (i === 0) {
    //       const ths = $(el).find('th');
    //       $(ths).each((i, el) => {
    //         console.log("el", el.text());
    //       })
    //     }
    //   })
    // }
  }


  // console.log($);
  // const linkCache = new Set();
  // console.log($);
  // console.log(pretty($('body').html()));

  // $('body').each();

  // console.log(ahref);
  // const anchor = $('a');
  // const body = $('body').html();
  // console.log(body);
  // const list = $('ul li');


  // console.log(anchor);
  // console.log(ahref);
 
  // if (!$.includes('a href')) return digestedData;
}

async function scrape(carrier) {
  console.log('we be scraping');
  const { data } = await axios.get(carrier);
  const $ = cheerio.load(data);
  // console.log(pretty($('body').html()));
  return $;
}


