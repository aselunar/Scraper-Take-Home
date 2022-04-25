const express = require('express');
const app = express();
const scrapeController = require('./scrapeController.js');

app.use(express.json());

// make a post request to localhost:3535/scrape
app.post('/scrape', scrapeController.scrapify, (req, res) => {
  console.log(JSON.stringify(res.locals.scrapedData));
  return res.status(200).json(res.locals.scrapedData);
});

// example body for post request
/* [{
	"carrier": "MOCK_INDEMNITY",
	"customerId": "a0dfjw9a"
},{
  "carrier": "PLACEHOLDER_CARRIER",
	"customerId": "f02dkl4e"
}] */

app.use((err, request, response, next) => {
  const defaultErr = {
    message: 'Error occurred in express middleware.',
    status: 500,
    log: 'Internal Server Error',
  };
  const error = Object.assign(defaultErr, err);
  return response.status(error.status).send(error.message);
});

console.log('a string');

app.listen('3535', console.log('listening on port 3535'));