const express = require('express');
const app = express();
// const path = require('path');
const scrapeController = require('./scrapeController.js');

app.use(express.json());

app.post('/scrape', scrapeController.scrapify, (req, res) => {
  // console.log(res.locals.scrapedData);
  return res.status(200).send(res.locals.scrapedData);
});

console.log('a string');

app.listen('3535', console.log('listening on port 3535'));