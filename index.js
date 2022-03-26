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



//Javier

var agriculturalproduction = [
    {
        country:"Afghanistan",
        year: 2018,
        production:4.02,
        absolute_change:434.520,
        relative_changes:"12%"
    },
    {
        country:"África",
        year: 2018,
        production:191.56,
        absolute_change:146.68,
        relative_changes:"327%"
    }

];

app.get(BASE_API_URL+ "/agriculturalproduction-stats",(req,res)=>{
    res.send(JSON.stringify(agriculturalproduction,null,2)); 
});

app.post(BASE_API_URL+ "/agriculturalproduction-stats",(req,res)=>{
    agriculturalproduction.push(req.body);
    res.sendStatus(201,"CREATED"); 
}); 

var productions=[];
app.get(BASE_API_URL+"/agriculturalproduction-stats", (req,res)=>{
    res.send(JSON.stringify(productions,null,2));
});

app.get(BASE_API_URL+"/agriculturalproduction-stats/loadInitialData",(req,res)=>{
    var v=[
        {
            country:"Afghanistan",
            year: 2018,
            production:4.02,
            absolute_change:434.520,
            relative_changes:"12%"
        },
        {
            country:"África",
            year: 2018,
            production:191.56,
            absolute_change:146.68,
            relative_changes:"327%"
        },
        {
            country:"Albania",
            year: 2018,
            production:678.196,
            absolute_change:385.797,
            relative_changes:"132%"
        },
        {
            country:"Argeria",
            year: 2018,
            production:6.06,
            absolute_change:5.13,
            relative_changes:"549%"
        },
        {
            country:"Americas",
            year: 2018,
            production:763.59,
            absolute_change:539.36,
            relative_changes:"241%"
        }
    ];

    v.forEach((a)=>{
        productions.push(a);
    });

    res.send(JSON.stringify(productions,null,2));
    });

    app.put(BASE_API_URL+"/agriculturalproductions-stats", (req,res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    });
    
    app.delete(BASE_API_URL+"/agriculturalproductions-stats",(req,res)=>{
        productions.splice(req.body);
        res.sendStatus(200, "OK");
    });

    //API DANIEL PUCHE JIMENEZ
var landusage_statsV1 = require("./landusage-stats");
landusage_statsV1.register(app);

    //API ALEJANDRO JORGE POYUELO
    var fertilizers_statsV1 = require("./fertilizers-stats");
    fertilizers_statsV1.register(app);