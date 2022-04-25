const express = require('express');
const app = express();
const scrapeController = require('./scrapeController.js');

app.use(express.json());

app.post('/scrape', scrapeController.scrapify, (req, res) => {
  console.log(JSON.stringify(res.locals.scrapedData));
  return res.status(200).json(res.locals.scrapedData);
});



app.listen('3535', console.log('listening on port 3535'));