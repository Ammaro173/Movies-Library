'use strict';

// eslint-disable-next-line no-undef
const express = require('express'); //framework , backend server side framework
// eslint-disable-next-line no-undef
const cors = require('cors'); //package , send & recieve
// eslint-disable-next-line no-undef
const movieData = require('./Movie Data/data.json'); // add te path of the file of Json file
/////////////////////////// endpoints // server fir food recipes

const app = express(); // to start using express
app.use(cors()); // use method

app.get('/', homePageHandler); //  / is the root or the home page // HellowWorldHandler is a fucntion! has 2 argum,ents a request and response , if home page is pushed fucntion will run
app.get('/Favorite', favouritePageHandler);
app.get('*', notFoundHandler); //anything except 2 above things ,show not found handler function

//making constructor
function Favorite(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

////////////////////////
// eslint-disable-next-line no-redeclare
function Error(status, responseText) {
  this.status = status;
  this.responseText = responseText;
}
function homePageHandler(req, res) {
  let obj = new Favorite(movieData.title, movieData.poster_path, movieData.overview);
  return res.status(200).json(obj); // response with status 200 (means everything is ok) , and send json obj
}

function favouritePageHandler(req, res) {
  return res.status(200).send('Welcome to the Favorite Page ');
}

function notFoundHandler(req, res) {
  let obj = new Error(404, 'Sorry, something went wrong,page not found error');
  res.status(404).send(obj);
}

/////////////////////////// creating ip address : , for any local machine  .... 127.0.0.1 or (localhost) !!!! maybe can run multiple server at the same time; so i will specify for each sever a track number (if i am using  multiple severs)... :port 3000,5500,8080

app.listen(3000, () => {
  console.log('listinig to port 3000');
});
