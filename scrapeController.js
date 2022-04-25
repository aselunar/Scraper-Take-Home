const axios = require('axios');
const cheerio = require('cheerio');

// Need this to take the input and turn it into a url.
const objOfUrls = {
  'MOCK_INDEMNITY': 'https://scraping-interview.onrender.com/mock_indemnity/',
  'PLACEHOLDER_CARRIER': 'https://scraping-interview.onrender.com/placeholder_carrier/'
}

// Construct an object with an array or Set of fields and an array or Set of values.
// Currently this is used to scrape policies, but it is fairly extensible.
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
      // Iterate through the request body.
      for (const customer of customerAndSiteInput){
        let site = objOfUrls[customer.carrier];
        // construct a url from the inputs
        let fullUrl = `${site}` + `${customer.customerId}`;
        // run the digestData function for each object in the array input and store it with a key of the customerId.
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
// Recursively run through each link in the page
  async function followLinks(carrier){
    // Scrape the data in each page.
    const $ = await scrape(carrier);
    const ahref = $('a[href]');
    // Find the data we are looking for in each page.
    await findData($);
    await ahref.each((i, el) => {
      let link = $(el).attr();
      // If a link does not exist in our linkCache add it to our linkCache and recursively run this function with that url.
      if (!linkCache.has(link.href) && link.href !== '#'){
        linkCache.add(link.href);
        let fullPath = new URL(link.href, carrier);
        let arg = fullPath.href;
        return new Promise(resolve => resolve(followLinks(arg)));
      }
    });
    // Base case is return digestedData if, when iterating through all ahrefs with .each, all ahrefs exist in linkCache.
    // This await is necessary to get the last page.
    return await digestedData;
  };

  // Responds better to two await statements. Need to refactor.
  // Puppeteer is set up better to handle this kind of asynchronous activity.
  // With more time I would import it instead of recursively calling followLinks.
  console.log("followLinks", await followLinks(carrier));
  return await followLinks(carrier);

  async function findData($){
    const tableHeaders = $('th');
    //Below is where we will push our fields and values to pass to our Policy constructor.
    const arrayOfFields = [];
    let arrayOfValues = [];
    // Push each table header to our array of fields.
    await tableHeaders.each((i, el) => {
      let header = $(el).text();
      arrayOfFields.push(header);
    });

    const tableRows = $('tr');
    await tableRows.each((i, el) => {
      let td = $(el).children();
      let tdlength = td.length;
      // If arrayOfFields length is equal to the number of tds in our row, push the text to our arrayOfValues.
      if (tdlength === arrayOfFields.length){
        td.each((i, el) => {
          let text = $(el).text();
          arrayOfValues.push(text);
        });
        if (arrayOfFields[0] != arrayOfValues[0]){
          // Construct our policy
          const newPolicy = new Policy(arrayOfFields, arrayOfValues);
          // Put our policy in our digestedData object with a key of the policy Id.
          digestedData[newPolicy.Id] = newPolicy;
        }
        // Reassign arrayOfValues so we can keep using it as we iterate with .each.
        arrayOfValues = [];        
      }
    })
    return;
  }
}

async function scrape(carrier) {
  const { data } = await axios.get(carrier);
  const $ = await cheerio.load(data);
  // variable name $ used as per cheerio convention.
  return $;
}


