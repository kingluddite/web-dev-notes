# DOM
## Scraping Web Pages with Express and DOM

[tutorial](https://scotch.io/tutorials/scraping-the-web-with-node-js)

`package.json`

```
{
  "name": "node-web-scrape",
  "version": "0.0.1",
  "description": "Scrape le web.",
  "main": "server.js",
  "author": "Scotch",
  "dependencies": {
    "cheerio": "latest",
    "express": "latest",
    "request": "latest"
  },
  "devDependencies": {
    "babel-eslint": "^7.2.3",
    "eslint": "^3.19.0",
    "eslint-config-airbnb": "^14.1.0",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-react": "^7.0.1"
  }
}
```

`server.js`

```
const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/scrape', function(req, res) {

  // All the web scraping magic will happen here
  url = 'http://www.imdb.com/title/tt1229340/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            const $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            let title, rating;
            var json = { title : "", rating : ""};

            $('.title_wrapper h1').filter(function(){

              let data = $(this);

              title = data.text().trim();

              json.title = title;

            })

            $('.imdbRating strong').filter(function() {
              let data = $(this);
              rating = data.text();

              json.rating = rating;
            });
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {

          console.log('File successfully written! - Check your project directory for the output.json file');

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!');

    })

});

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
```
