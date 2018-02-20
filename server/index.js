const express = require('express');
const parser = require('body-parser');
const mysql = require('mysql');
const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const db = require('../database/index.js');
const app = express();

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.set('port', 8080);

app.get('/zillow', (req, res) => {
  const inputZip = req.body.zip;
  const url1 = `https://www.zipcodeapi.com/rest/XUdRusqAL97aO28KYyMzfhZmkBLzSl7Qs853mWwzTSlxLRktAmrNTfQ2kr9bd8BE/radius.json/${inputZip}/1/km`;
  request(url1, (error, response, dataa) => {
    const data = JSON.parse(dataa);
    const zipCodes = data.zip_codes.map(x => x.zip_code);
    const urls = zipCodes.map(zip => `https://www.zillow.com/homes/${zip}_rb/`);
    let prices = [];
    let addresses = [];
    let images = [];

    const searchUrl = (i) => {
      request(urls[i], (err, resp, html) => {
        const $ = cheerio.load(html);
        const imgs = $("div[class='zsg-photo-card-img'] img");
        const results = $("div[class='zsg-photo-card-caption']");

        imgs.each((x, img) => {
          images.push($(img).attr('src'));
        });

        results.each((j, item) => {
          prices.push(String(item.children[1].children[0].children[0].data));
          addresses.push(String(item.children[2].children[0].children[0].data));
        });
        if (i < urls.length - 1) {
          searchUrl(i + 1);
        } else {
          addresses = addresses.filter((x, z) => prices[z] !== 'undefined' && prices[z].slice(-3) === '/mo');
          images = images.filter((x, z) => prices[z] !== 'undefined' && prices[z].slice(-3) === '/mo');
          prices = prices.filter(x => x !== 'undefined' && x.slice(-3) === '/mo');
          prices = prices.map((x) => {
            let y = x.slice(1).split(',').join('');
            y = y.slice(0, y.length - 3);
            return Number(y);
          });

          const obj = {
            prices,
            addresses,
            images,
          };
          res.status(200).send(obj);
        }
      });
    };
    searchUrl(0);
  });
});

app.listen(app.get('port'));
console.log('Listening on port 8080.')
