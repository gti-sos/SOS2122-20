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
var agriculturalP=[];

var agriculturalproduction_stats=[
    {
        country:"Afghanistan",
        year: 2018,
        production:4.02,
        absolute_change:434.520,
        relative_change:"12%"
    },
    {
        country:"África",
        year: 2018,
        production:191.56,
        absolute_change:146.68,
        relative_change:"327%"
    },
    {
        country:"Albania",
        year: 2018,
        production:678.196,
        absolute_change:385.797,
        relative_change:"132%"
    },
    {
        country:"Argeria",
        year: 2018,
        production:6.06,
        absolute_change:5.13,
        relative_change:"549%"
    },
    {
        country:"Americas",
        year: 2018,
        production:763.59,
        absolute_change:539.36,
        relative_change:"241%"
    }
    ];

//GET para los datos iniciales:
app.get(BASE_API_URL+"/agriculturalproductions-stats/loadInitialData",(req,res)=>{
    if(agriculturalP.length<5){
        agriculturalproduction_stats.forEach((a)=>{
            agriculturalP.push(a);
        });
            res.send(JSON.stringify(agriculturalP,null,2));
    }else{
            res.send(JSON.stringify(agriculturalP,null,2));
    }   
    
    });

//GET al conjunto:
app.get(BASE_API_URL+ "/agriculturalproduction-stats",(req,res)=>{
    res.send(JSON.stringify(agriculturalP,null,2)); 

});

//POST al conjunto:
app.post(BASE_API_URL+ "/agriculturalproduction-stats",(req,res)=>{
    agriculturalP.push(req.body);
    res.sendStatus(201,"CREATED"); 
}); 

//DELETE al conjunto:
app.delete(BASE_API_URL+"/agriculturalproduction-stats",(req,res)=>{
    agriculturalP.splice(req.body);
    res.sendStatus(200, "OK");
});

//PUT al conjunto(nos devuelve error):
app.put(BASE_API_URL+"/agriculturalproduction-stats", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

//PUT a un recurso concreto(pais y año):
app.put(BASE_API_URL+"/agriculturalproduction-stats/:country/:year",(req,res)=>{
    if(req.body.country == null |
        req.body.year == null | 
        req.body.production == null | 
        req.body.absolute_change == null | 
        req.body.relative_change == null){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        var country = req.params.country;
        var year = req.params.year;
        var body = req.body;
        var index = agriculturalP.findIndex((reg) =>{
            return (reg.country == country && reg.year == year)
        })
        if(index == null){
            res.sendStatus(404,"NOT FOUND");
        }else if(country != body.country || year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var  update_productions = {...body};
            agriculturalP[index] = update_productions;

            res.sendStatus(200,"UPDATED");
        }
    }

});

//DELETE a un recurso concreto:
app.delete(BASE_API_URL +"/agriculturalproduction-stats/:country", (req,res)=>{ //borrar todos los recursos
    var country = req.params.country; 
    agriculturalP.filter((cont) =>{ 
        return (cont.country != country); 
    });
    res.sendStatus(200, "OK");
});
  
//POST a un recurso concreto(nos devuelve error):
app.post(BASE_API_URL+"/agriculturalproduction-stats/:country",(req,res)=>{
    res.sendStatus(405,"METHOD NOT FOUND"); 
});

//GET a un recurso concreto:
app.get(BASE_API_URL +"/agriculturalproduction-stats/:country", (req,res)=>{
    var country = req.params.country; 
    filteredCountry = agriculturalproduction_stats.filter((cont) =>{ 
        return (cont.country == country); 
    });
    if(filteredCountry == 0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredCountry, null,2));
    }
});

    //API DANIEL PUCHE JIMENEZ
var landusage_statsV1 = require("./landusage-stats");
landusage_statsV1.register(app);

    //API ALEJANDRO JORGE POYUELO
    var fertilizers_statsV1 = require("./fertilizers-stats");
    fertilizers_statsV1.register(app);