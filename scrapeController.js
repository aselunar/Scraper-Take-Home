const axios = require('axios');
const cheerio = require('cheerio');
// importing pretty to make our console logs easier to read.
const pretty = require('pretty');

const objOfUrls = {
  'MOCK_INDEMNITY': 'https://scraping-interview.onrender.com/mock_indemnity/',
  'PLACEHOLDER_CARRIER': 'https://scraping-interview.onrender.com/placeholder_carrier/'
}

const Policy = function([...arrayOfFields], [...arrayOfValues]) {
 let fields = [...arrayOfFields];
 let values = [...arrayOfValues];
 for (let i = 0; i < fields.length; i++){
   this[fields[i]] = values[i];
 };
}

// const digestedData = {};

module.exports = {

  scrapify: async (req, res, next) => {
    try{
      res.locals.scrapedData = {};
      const customerAndSiteInput = req.body;
      for (const customer of customerAndSiteInput){
        // digestedData = {};
        let site = objOfUrls[customer.carrier];
        let fullUrl = `${site}` + `${customer.customerId}`;
        console.log(fullUrl);
        // let digestedData = await digestData(fullUrl);
        // console.log("digestedData", digestedData);
        console.log("digestData", await digestData(fullUrl));
        res.locals.scrapedData[customer.customerId] = await digestData(fullUrl);
        // console.log(res.locals.scrapedData);
      };
      return next();
    }
    catch (error){
      return next({
        message: 'error in scraping',
        status: 400,
        log: `Error in scrapify middleware ${error}`
      })
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
    await findData($);
    // console.log('ahref', ahref);
    ahref.each((i, el) => {
      // console.log('el', el);
      let link = $(el).attr();
      // console.log('link', link);
      if (!linkCache.has(link.href) && link.href !== '#'){
        // findData($);
        // console.log("type", link.href);
        linkCache.add(link.href);
        // console.log("linkCache", linkCache);
        // console.log("carrier", carrier);
        let fullPath = new URL(link.href, carrier);
        let arg = fullPath.href;
        // console.log("arg", fullPath);
        return new Promise(resolve => resolve(followLinks(arg)));
      }
    });
    // console.log(foundData);
    // return foundData;

    // console.log(await "digestedData", digestedData);
    // This await is necessary to get the last page
    return await digestedData;
  };

  // linkCache.add(carrier);
  console.log("followLinks", await followLinks(carrier));
  return await followLinks(carrier);
  console.log("foundData", foundData);
  return foundData;
  // await console.log("linkCache", linkCache);


  async function findData($){
    // const policies = new Map();
    // let policy = {};
    const tableHeaders = $('th');
    const arrayOfFields = [];
    let arrayOfValues = [];
    await tableHeaders.each((i, el) => {
      let header = $(el).text();
      // Policy.prototype[header] = Policy.arguments[i];
      // console.log("header", header);
      arrayOfFields.push(header);
    });
    // console.log("arrayOfFields", arrayOfFields);
    // console.log("Policy", Policy.prototype);
    // const policyLength = Object.keys(Policy.prototype).length;
    // console.log("length", policyLength);
    const tableRows = $('tr');
    await tableRows.each((i, el) => {
      let td = $(el).children();
      let tdlength = td.length;
      if (tdlength === arrayOfFields.length){
        // let td = $(el).children().text();
        // console.log(td);
        td.each((i, el) => {
          let text = $(el).text();
          // console.log("text", text);
          arrayOfValues.push(text);
        });
        // console.log(arrayOfValues);
        if (arrayOfFields[0] != arrayOfValues[0]){
          const newPolicy = new Policy(arrayOfFields, arrayOfValues);
          // console.log(newPolicy);
          digestedData[newPolicy.Id] = newPolicy;
        }
        arrayOfValues = [];
        
        // console.log('digestedData', digestedData);


        // console.log("arrayOfFields", arrayOfFields);
        // console.log("arrayOfValues", arrayOfValues);
        // const newPolicy = new Policy(1, 2, 3, 4, 5);
        // console.log(newPolicy);
        // newPolicy['Effective Date'] = 5;
        // console.log(newPolicy.Premium)
        // for (let column in newPolicy){
        //   let index = 0;
        // let td = $(el).children().text();
        // const keys = Object.keys(newPolicy);
        // console.log("keys", keys);
        // console.log("i", i);
        // newPolicy[Object.keys(newPolicy)[i]] = td;
        //   console.log("td", td);
        //   newPolicy[column] = td;
        //   // index++;
        // }
        // let td = $(el).children();
        // td.each((i, el) => {
        //   newPolicy[i] = el;
        // })
        // newPolicy[i] = td;
        // console.log("policy", newPolicy);
      }
      // console.log("digestedData", digestedData);
      // return digestedData;
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
    return;
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
  // console.log('digestedData returned', digestedData);
  // return digestedData;
}

async function scrape(carrier) {
  console.log('we be scraping');
  const { data } = await axios.get(carrier);
  const $ = cheerio.load(data);
  // console.log(pretty($('body').html()));
  return $;
}


