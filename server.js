/* eslint-disable no-undef */
'use strict';

// eslint-disable-next-line no-undef
//use require for any package!
// ADD EVERYTHING IN READ ME FILE (DOCUMENTAION)
// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef
require('dotenv').config(); //npm i dotenv

// eslint-disable-next-line no-undef
const express = require('express'); //framework , backend server side framework
// eslint-disable-next-line no-undef
const cors = require('cors'); //package , send & recieve
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const movieData = require('./Movie Data/data.json'); // add te path of the file of Json file //Task 11 // no longer needed!!
// eslint-disable-next-line no-undef
const { default: axios } = require('axios');
/////////////////////////// endpoints // server fir food recipes ///its taken from API!!! thats why we didnt take it directly +API is away to take request and give response (also translates on his own)
// and from now on we are going to deal with 3rd party API using GET Method "Url"
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
const app = express(); // to start using express  app or server! its just a name
app.use(cors()); // use method

app.use(express.json()); // to parse (parseInt (stringS!!)) the body content to JSON Format //New!!
// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();

const pg = require('pg'); // use pg library!!

const client = new pg.Client(process.env.DATABASE_URL); // Cient or db(DataBase)
// const client = new pg.Client({
//   connectionString: 'postgres://ammaro:0000@localhost:5432/movies',
//   ssl: { rejectUnauthorized: false },
// });

app.get('/', homePageHandler); //  / is the root or the home page // HellowWorldHandler is a fucntion! has 2 argum,ents a request and response , if home page is pushed fucntion will run
app.get('/Favorite', favouritePageHandler); // get request
app.get('/trending', trendingPageHandler);
app.get('/regions', regionsHandler);
app.get('/search', searchHandler);
app.get('/genre', genreHandler);

app.post('/addmovie', addMovieHandler); //task13
app.get('/getMovies', getMoviesHandler); // Task 13

app.get('*', notFoundHandler); //anything except 2 above things ,show not found handler function
app.use(errorHandler); // use not get in case of any server errors!!

// eslint-disable-next-line no-undef

//making constructor
function Favourite(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}
function Searcher(id, backdrop_path, release_date) {
  this.id = id;
  this.backdrop_path = backdrop_path;
  this.release_date = release_date;
}

function Regioner(iso_3166_1, english_name, native_name) {
  this.iso_3166_1 = iso_3166_1;
  this.english_name = english_name;
  this.native_name = native_name;
}

function Genrer(id, name) {
  this.id = id;
  this.name = name;
}
////////////////////////
// eslint-disable-next-line no-redeclare
function Error(status, responseText) {
  this.status = status;
  this.responseText = responseText;
}

// ${process.env.APIKEY}`;
// eslint-disable-next-line no-undef

let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.APIKEY}`; // dont forget api key if the site needs it!!!! + dont forget the .env file (ALL IN CAPITAL , NO SPACES ,NOTHING)!! to hide your apiKey and money other stuff!! it will be auto added to gitignore!!

function homePageHandler(req, res) {
  // if my data isnt not from Json file , we use api (axios) library(libarary means you need to install ): which takes your request (get!!).

  // WILL GET THE DATA FROM THE URL !! DONT FORGET THE TIME

  // let obj = new Favourite(movieData.id, movieData.title, movieData.release_date, movieData.poster_path, movieData.overview); // still no need for looping with .map or for loop because we had only 1 object!! letmemes=memes.data.map()

  return res.status(200).send('welcome to home page'); // response with status 200 (means everything is ok) , and send json obj
}

function favouritePageHandler(req, res) {
  return res.status(200).send('Welcome to the Favorite Page '); // send method (built in function)
}
// eslint-disable-next-line no-unused-vars
function trendingPageHandler(req, res) {
  axios
    .get(url)
    .then((dataApi) => {
      ////// this data is what i will  recieve from api
      //message  // dont forget to console.log everything every time!!!!!!!!!!!!!!!!!!!!!!!!
      // eslint-disable-next-line no-unused-vars
      // check data!!!!
      // eslint-disable-next-line no-unused-vars
      let obj = dataApi.data.results.map((ele) => {
        return new Favourite(ele.id, ele.title, ele.release_date, ele.poster_path, ele.overview); // retirive what you want!! //ele.id (what has you data!! .id)
      });
      res.status(200).json(obj);
    })
    .catch((err) => {
      //message

      errorHandler(err, req, res);
    });
}

function searchHandler(req, res) {
  // let name = req.query.name; //task13 updated
  // let urls = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${name}`; //task13 updated

  let urls = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=spiderman&page=1&include_adult=false`;
  axios
    .get(urls)
    .then((dataApi) => {
      let obj = dataApi.data.results.map((elee) => {
        return new Searcher(elee.id, elee.backdrop_path, elee.release_date);
      });
      res.status(200).json(obj);
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}

function regionsHandler(req, res) {
  let urls = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${process.env.APIKEY}&language=en-US`;
  axios
    .get(urls)
    .then((dataApi) => {
      let obj = dataApi.data.results.map((elee) => {
        return new Regioner(elee.iso_3166_1, elee.english_name, elee.native_name);
      });
      res.status(200).json(obj);
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}
function genreHandler(req, res) {
  let urls = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.APIKEY}&language=en-US`;
  axios
    .get(urls)
    .then((dataApi) => {
      let obj = dataApi.data.genres.map((elee) => {
        return new Genrer(elee.id, elee.name);
      });
      res.status(200).json(obj);
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}

function addMovieHandler(req, res) {
  let movies = req.body;
  // eslint-disable-next-line quotes
  // console.log(movies);
  let sql = 'INSERT INTO favmovies(title,original_title,vote_count,poster_path,overview,release_date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;';
  let obj = [movies.title, movies.original_title, movies.vote_count, movies.poster_path, movies.overview, movies.release_date];
  console.log(obj);

  client
    .query(sql, obj)
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}

function getMoviesHandler(req, res) {
  // eslint-disable-next-line quotes
  let sql = `SELECT * FROM favmovies;`;
  client
    .query(sql)
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}

function notFoundHandler(req, res) {
  let obj = new Error(404, 'Sorry, something went wrong,page not found error');
  res.status(404).send(obj);
}

function errorHandler(err, req, res) {
  const errorr = {
    status: 500,
    message: 'error',
  };
  res.status(500).send(errorr);
}
/////////////////////////// creating ip address : , for any local machine  .... 127.0.0.1 or (localhost) !!!! maybe can run multiple server at the same time; so i will specify for each sever a track number (if i am using  multiple severs)... :port 3000,5500,8080
client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`listining to port ${PORT}`);
  });
});

//////////////////////////////////////////////////////// Task12 DEMO/////////////////////////////////////////////
// const p = new Promise(function (resolve, reject) {
//   let a = 1 + 1;
//   // eslint-disable-next-line eqeqeq
//   if (a == 2) {
//     resolve('success'); // the uber drive example // resolve is for Promise!! //its similar to return
//   } else {
//     reject('failed'); // reject is for Promise!!
//   }
// });

// p.then((result) => {
//   // check for the result/ resolve directly from P (Promise) // you can use data or relite or anyhting instead of result  .. 1st parameter
//   console.log(result);
// }).catch((errMsg) => {
//   // not p. then because on promise i dont want to check for error/Reject directly!! // 2nd parameter
//   console.log(errMsg);
// });

setTimeout(() => {
  console.log('inside the setTimeout');
}, 0); // 0 is the time in ms!!
