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