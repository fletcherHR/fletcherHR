const express = require('express');
//const parse = require('body-parser'); Fix when we determine what kind of data API key gives
const mysql = require('mysql')
const axios = require('axios')
const db = require('../database/index.js')
let app = express();


app.use(express.static(__dirname + '/../client/dist'));

app.set('port', 8080)




app.listen(app.get('port'));
console.log('Listening on port 8008.')
