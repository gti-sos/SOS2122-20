const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser =require("body-parser");

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

// ALEJANDRO
var fertilizers =[
    {
        country:"afghanistan",
        year:2017,
        quantity:17.80,
        absolute_change:14.64,
        relative_change:4.63


    },
    {
        country:"africa",
        year:2017,
        quantity:15.09,
        absolute_change:3.18,
        relative_change:0.27
    }
];
app.get(BASE_API_URL+ "/fertilizers",(req,res)=>{
    res.send(JSON.stringify(fertilizers,null,2)); 

});


app.post(BASE_API_URL+ "/fertilizers",(req,res)=>{
    fertilizers.push(req.body);
    res.sendStatus(201,"CREATED"); 
}); 

var fertilizers=[];
app.get(BASE_API_URL+"/fertilizers", (req,res)=>{
    res.send(JSON.stringify(fertilizers,null,2));
})

app.get(BASE_API_URL+"/fertilizers/loadInitialData",(req,res)=>{
    var iniData=[
        {
        country:"afghanistan",
        year:2017,
        quantity:17.80,
        absolute_change:14.64,
        relative_change:463,
    },
    {  
         country:"africa",
        year:2017,
        quantity:15.09,
        absolute_change:3.18,
        relative_change:27,
    },
    {  
         country:"albania",
        year:2017,
        quantity:56.70,
        absolute_change:2.03,
        relative_change:4,
    },
    {  
         country:"algeria",
        year:2017,
        quantity:8.27,
        absolute_change:4.85,
        relative_change:142,
    },
    {  
         country:"americas",
        year:2017,
        quantity:65.85,
        absolute_change:17.96,
        relative_change:38,
    }
];
iniData.forEach((a)=>{
    fertilizers.push(a);
});
res.send(JSON.stringify(fertilizers,null,2));
})

    



//Daniel Puche

var landusage = [
    {
        country : "Spain",
        code : "SPA",
        year : 2015,
        "built-area" :10 ,
        "grazing-area" :10 ,
        "cropland-area" : 10,
    },
    {
        country : "Spain",
        code : "SPA",
        year : 2016,
        "built-area" :10 ,
        "grazing-area" :10 ,
        "cropland-area" : 10,
    }
]

app.get(BASE_API_URL+ "/landusage-stats",(req,res)=>{
    res.send(JSON.stringify(landusage,null,2)); 
});

app.post(BASE_API_URL+ "/landusage-stats",(req,res)=>{
    landusage.push(req.body);
    res.sendStatus(201,"CREATED"); 
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