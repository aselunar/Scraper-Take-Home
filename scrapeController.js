const axios = require('axios');
const cheerio = require('cheerio');
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

module.exports = {

  scrapify: async (req, res, next) => {
    try{
      res.locals.scrapedData = {};
      const customerAndSiteInput = req.body;
      for (const customer of customerAndSiteInput){
        let site = objOfUrls[customer.carrier];
        let fullUrl = `${site}` + `${customer.customerId}`;
        res.locals.scrapedData[customer.customerId] = await digestData(fullUrl);
      };
      return await next();
    }
    catch (err) {
      return next({
        message: 'Error in scraping',
        status: 400,
        log: `Error in scrapeController.scrapify middleware. ${err}`
      })
    }
  }   
};

async function digestData(carrier){
  const linkCache = new Set();
  const digestedData = {};

  async function followLinks(carrier){
    const $ = await scrape(carrier);
    const ahref = $('a[href]');
    await findData($);
    await ahref.each((i, el) => {
      let link = $(el).attr();
      if (!linkCache.has(link.href) && link.href !== '#'){
        linkCache.add(link.href);
        let fullPath = new URL(link.href, carrier);
        let arg = fullPath.href;
        return new Promise(resolve => resolve(followLinks(arg)));
      }
    });
    // This await is necessary to get the last page
    return await digestedData;
  };

  // Responds better to two await statements. Need to refactor.
  // Puppeteer is set up better to handle this kind of asynchronous activity.
  // With more time I would import it instead of recursively calling followLinks.
  console.log("followLinks", await followLinks(carrier));
  return await followLinks(carrier);

  async function findData($){
    const tableHeaders = $('th');
    const arrayOfFields = [];
    let arrayOfValues = [];

    await tableHeaders.each((i, el) => {
      let header = $(el).text();
      arrayOfFields.push(header);
    });

    const tableRows = $('tr');
    await tableRows.each((i, el) => {
      let td = $(el).children();
      let tdlength = td.length;
      if (tdlength === arrayOfFields.length){
        td.each((i, el) => {
          let text = $(el).text();
          arrayOfValues.push(text);
        });
        if (arrayOfFields[0] != arrayOfValues[0]){
          const newPolicy = new Policy(arrayOfFields, arrayOfValues);
          digestedData[newPolicy.Id] = newPolicy;
        }
        arrayOfValues = [];        
      }
    })
    return;
  }
}

async function scrape(carrier) {
  console.log('we be scraping');
  const { data } = await axios.get(carrier);
  const $ = await cheerio.load(data);
  return $;
}


