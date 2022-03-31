const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser =require("body-parser");
const path = require("path");
const BASE_API_URL = "/api/v1";
const app=express();
app.use(bodyParser.json());
const port = process.env.PORT || 8081;



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



//API JAVIER LARA PARRILLA
var agriculturalproduction_statsV1=require("./agriculturalproduction-stats");
agriculturalproduction_statsV1.register(app);

//API DANIEL PUCHE JIMENEZ
var landusage_statsV1 = require("./landusage-stats");
landusage_statsV1.register(app);

//API ALEJANDRO JORGE POYUELO
var fertilizers_statsV1 = require("./fertilizers-stats");
fertilizers_statsV1.register(app);