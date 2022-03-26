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
// Get recurso
app.get(BASE_API_URL+ "/fertilizers-stats",(req,res)=>{
    res.send(JSON.stringify(fertilizers,null,2)); 

});

// Post recurso
app.post(BASE_API_URL+ "/fertilizers-stats",(req,res)=>{
    fertilizers.push(req.body);
    res.sendStatus(201,"CREATED"); 
}); 


app.get(BASE_API_URL+"/fertilizers-stats", (req,res)=>{
    res.send(JSON.stringify(fertilizers,null,2));
});


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
app.get(BASE_API_URL+"/fertilizers-stats/loadInitialData",(req,res)=>{
if(fertilizers.length<5){
    iniData.forEach((a)=>{
        fertilizers.push(a);
    });
    res.send(JSON.stringify( fertilizers,null,2));
}
else{
    res.send(JSON.stringify( fertilizers,null,2));
}

});

// Put recurso -> error
app.put(BASE_API_URL+"/fertilizers-stats", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});
// Borrar recurso -> Array vacío
app.delete(BASE_API_URL+"/fertilizers-stats",(req,res)=>{
    fertilizers.splice(req.body);
    res.sendStatus(200, "OK");
});

// Post recurso concreto -> Error
app.post(BASE_API_URL+"/fertilizers-stats/:country",(req,res)=>{
    res.sendStatus(405,"METHOD NOT FOUND"); 
});

// Get recurso concreto
app.get(BASE_API_URL+ "/fertilizers-stats/:country",(req,res)=>{

    var fertilizersCountry = req.params.country;
    filteredCountry = fertilizers.filter((e)=>{
        return (e.country == fertilizersCountry);
    });

    if(filteredCountry==0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredCountry[0],null,2));
    }
});

// Borrado recurso concreto
app.delete(BASE_API_URL+"/fertilizers-stats/:country",(req,res)=>{
    var fertilizersCountry= req.params.country;
    fertilizers= fertilizers.filter((e)=>{
       return (e.country != fertilizersCountry);
    });
    res.sendStatus(200,"OK"); 
});

// Actualización recurso concreto
app.put(BASE_API_URL+"/fertilizers-stats/:country/:year",(req,res)=>{
    if(req.body.country == null |
        req.body.year == null | 
        req.body.quantity == null | 
        req.body.absolute_change == null | 
        req.body.relative_change == null){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        var country = req.params.country;
        var year = req.params.year;
        var body = req.body;
        var index = fertilizers.findIndex((reg) =>{
            return (reg.country == country && reg.year == year)
        })
        if(index == null){
            res.sendStatus(404,"NOT FOUND");
        }else if(country != body.country || year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var  update_fertilizers = {...body};
            fertilizers[index] = update_fertilizers;

            res.sendStatus(200,"UPDATED");
        }
    }

})

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