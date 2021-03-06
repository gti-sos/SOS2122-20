const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser =require("body-parser");
const app=express();
app.use(bodyParser.json());
const port = process.env.PORT || 8081;
const path = require("path");

// Proxy
const cors = require("cors"); 
const request = require("request");


app.use(cors());

//Proxy fertilizers-stats
var paths='/remoteAPI';
var apiServerHost = 'https://sos2122-24.herokuapp.com/api/v1/air-pollution-stats';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


//Proxy landusage-stats
var paths1='/remoteAPIdanpucjim';
var apiServerHost1 = 'https://sos2122-20.herokuapp.com/api/v1/landusage-stats';

app.use(paths1, function(req, res) {
  var url = apiServerHost1 + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var paths1='/CancerAPI';
var apiServerHostd = 'https://sos2122-24.herokuapp.com/api/v1/cancerdeaths-stats';

app.use(paths1, function(req, res) {
  var url = apiServerHostd + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var paths1='/CaloryAPI';
var apiServerHostp = 'https://sos2021-10.herokuapp.com/api/v2/foodconsumption-stats';

app.use(paths1, function(req, res) {
  var url = apiServerHostp + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


//Proxy agricultural-stats
var paths2='/remoteAPI2';
var apiServerHost2 = 'https://sos2122-21.herokuapp.com/api/v1/in-use-vehicles';

app.use(paths2, function(req, res) {
  var url = apiServerHost2 + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});



app.use("/", express.static('public'));

app.get("/cool", (req,res)=>{
    console.log("Requested / faces route");
    res.send("<html><body><h1>"+cool()+"!</h1></body></html>")
});

app.get("/time", (req,res)=>{
    console.log("Requested / time route");
    res.send("<html><body><h1>"+cool()+"!</h1></body></html>")
});


app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});


    //API DANIEL PUCHE JIMENEZ
var landusage_statsV1 = require("./src/backend/danpucjimAPI/landusage-stats.js");
landusage_statsV1.register(app);

    //API ALEJANDRO JORGE POYUELO
    var fertilizers_statsV1 = require("./src/backend/alejorpoyAPI/fertilizers-statsdb");
    fertilizers_statsV1.register(app);

    //API JAVIER LARA PARRILLA
    var fertilizers_statsV1 = require("./src/backend/javlarparAPI/agricultural-stats.js");
    fertilizers_statsV1.register(app);
