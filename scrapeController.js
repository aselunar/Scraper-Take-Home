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

module.exports = {

  scrapify: async (req, res, next) => {
    try{

      const customerAndSiteInput = req.body;
      for (const customer of customerAndSiteInput){
        let site = objOfUrls[customer.carrier];
        let fullUrl = `${site}` + `${customer.customerId}`;
        console.log(fullUrl);
        /*res.locals.$[customer] = */digestData(fullUrl);
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


  // async function findData($){
  //   const tables = $('table');
  //   tables.each((el) => {
  //     let tableHeading = $(el).children('th');
  //     console.log(tableHeading);
  //   })
  // }
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

