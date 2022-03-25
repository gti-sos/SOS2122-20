const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser =require("body-parser");

const BASE_API_URL = "/api/v1";
const OWN_API_URL = "/landusage-stats";
const app=express();
app.use(bodyParser.json());
const port = process.env.PORT || 8081;

//API DANIEL PUCHE JIMENEZ
//var landusage_statsV1 = require("./landusage-stats");
//landusage_statsV1.register(app);

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

var fertilizers=[];
app.get(BASE_API_URL+"/fertilizers-stats", (req,res)=>{
    res.send(JSON.stringify(fertilizers,null,2));
});

app.get(BASE_API_URL+"/fertilizers-stats/loadInitialData",(req,res)=>{
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
if(fertilizers-stats.length<5){
    iniData.forEach((a)=>{
        fertilizers-stats.push(a);
    });
    res.send(JSON.stringify( fertilizers-stats,null,2));
}
else{
    res.send(JSON.stringify( fertilizers-stats,null,2));
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


    var landusage_stats = [];
    var landusage_stats_initial = [
        {
        country:"Africa",
        code : "",
        year:2016,
        "built-area":6235010,
        "grazing-area":888088030,
        "cropland-area":296972060,
    },
    {  
        country:"BRAZIL",
        code:"BRA",
        year:2016,
        "built-area":3358012,
        "grazing-area":196006800,
        "cropland-area":82297200,
    },
    {  
        country:"BRAZIL",
        code : "BRA",
        year:2015,
        "built-area":3289368,
        "grazing-area":196005400,
        "cropland-area":81855260,
    },
    {  
        country:"CANADA",
        code: "CAN",
        year:2016,
        "built-area":435730,
        "grazing-area":14030090,
        "cropland-area":47912430,
    },
    {  
        country:"Canada",
        code : "CAN",
        year:2014,
        "built-area":421859,
        "grazing-area":14300740,
        "cropland-area":47771180,
    }
    ];
    
    //GET Datos Iniciales
    app.get(BASE_API_URL + OWN_API_URL + "/loadInitialData",(req,res)=>{
        if(landusage_stats.length<5){
            landusage_stats_initial.forEach((a)=>{
                landusage_stats.push(a);
            });
            res.send(JSON.stringify(landusage_stats,null,2));
        }
        else{
            res.send(JSON.stringify(landusage_stats,null,2));
        }
       
    });
    
    //GET CONJUNTO
    app.get(BASE_API_URL + OWN_API_URL, (req,res)=>{ 
        res.send(JSON.stringify(landusage_stats, null,2)); // devuelve el conjunto 
    });
    
    //POST CONJUNTO
    app.post(BASE_API_URL + OWN_API_URL, (req,res)=>{
        landusage_stats.push(req.body); // anyade lo que le pasemos en el cuerpo de la peticion
        res.sendStatus(201, "CREATED"); // devuelve codigo correcto
    });
    
    //DELETE CONJUNTO
    app.delete(BASE_API_URL + OWN_API_URL, (req,res)=>{ 
        landusage_stats = []; // deja vacio el conjunto
        res.sendStatus(200, "OK"); // devuelve codigo correcto
    });
    
    //GET ELEMENTO POR PAIS
    app.get(BASE_API_URL + OWN_API_URL+"/:country", (req,res)=>{
        var country = req.params.country; // guarda el pais de la peticion
        filteredCountry = landusage_stats.filter((cont) =>{ // filtra por el pais 
        return (cont.country == country); 
        
        });
    
        if(filteredCountry == 0){ // si devuelve falso devuelve error de no encontrado
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredCountry, null,2)); // si devuelve true devuelve los que coinciden.
        }
    });
    
    //GET ELEMENTO POR ANYO
    app.get(BASE_API_URL + OWN_API_URL+"/:country/:year", (req,res)=>{
        var country = req.params.country; // guarda el pais de la peticion
        var yearName = req.params.year; // guarda el anyo de la peticion
        filteredYear = landusage_stats.filter((cont) =>{ 
        return (cont.country == country) && (cont.year == yearName); // filtra los que coinciden con el anyo y el pais de la peticion 
        
        });
    
        if(filteredYear == 0){ // si es 0(falso) devuelve error de no encontrado
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredYear, null,2)); // si es verdadero devuelve los valores que coinciden con el filtrado.
        }
    });
    
    //DELETE ELEMENTO POR PAIS
    app.delete(BASE_API_URL + OWN_API_URL+"/:country", (req,res)=>{ //borrar todos los recursos
        var country = req.params.country; // pais de la peticion 
        landusage_stats.filter((cont) =>{ // filtrar pais que coindice con la peticion
            return (cont.country != country); 
        });
        res.sendStatus(200, "OK");
    });
    
    // DELETE ELEMENTO POR ANYO
    app.delete(BASE_API_URL + OWN_API_URL+"/:country/:year", (req,res)=>{ //borrar todos los recursos
        var country = req.params.country; //pais de la peticion
        var yearName = req.params.year; //anyo de la peticion
        landusage_stats.filter((cont) =>{
            return (cont.country != country) && (cont.year != yearName); //comprobar que el pais y el anyo de la peticion coindice mediante filtrado
        });
        res.sendStatus(200, "OK"); // devolver codigo de ok 
    });
    
    // Actualización recurso concreto
    app.put(BASE_API_URL+OWN_API_URL+"/:country/:year",(req,res)=>{
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
            var index = landusage_stats.findIndex((reg) =>{
                return (reg.country == country && reg.year == year)
            })
            if(index == null){
                res.sendStatus(404,"NOT FOUND");
            }else if(country != body.country || year != body.year){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                var  update_landusage = {...body};
                landusage_stats[index] = update_landusage;
    
                res.sendStatus(200,"UPDATED");
            }
        }
    
    });