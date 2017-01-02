/* globals require module */
'use strict';

const express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();

const secretStrings = {
    production: process.env.SECRET_STRING,
    development: 'james bond 007'
};

const crossOrigin = {
    production: "https://paradiserestaurant.herokuapp.com",
    development: "http://localhost:4200"
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: secretStrings[process.env.NODE_ENV || "development"], resave: true, saveUninitialized: true }));
//secret: read from file!
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
module.exports = app;