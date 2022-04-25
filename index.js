const express = require('express');
const app = express();
const scrapeController = require('./scrapeController.js');

app.use(express.json());

app.post('/scrape', scrapeController.scrapify, (req, res) => {
  console.log(JSON.stringify(res.locals.scrapedData));
  return res.status(200).json(res.locals.scrapedData);
});

app.use((err, req, res, next) => {
    const defaultErr = {
      message: 'Error occurred in express middleware.',
      status: 500,
      log: 'Internal Server Error',
    };
    const error = Object.assign(defaultErr, err);
    console.log(log);
    return response.status(error.status).send(error.message);
  });

app.listen('3535', console.log('listening on port 3535'));