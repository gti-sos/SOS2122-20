/*
API Alejandro Jorge Poyuelo 
fertilizers stats V1

*/
module.exports.register = (app) => {
    const BASE_API_URL = "/api/v1";
    const OWN_API_URL = "/fertilizers-stats";
    const path = require("path");
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());



// ALEJANDRO
var fertilizers =[];
// Get recurso
app.get(BASE_API_URL+ "/fertilizers-stats",(req,res)=>{
    res.send(JSON.stringify(fertilizers,null,2)); 

});

// Post recurso
app.post(BASE_API_URL + "/fertilizers-stats", (req,res)=>{
    var newData = req.body;
    var year = req.body.year;
    var country = req.body.country;

    for(let i = 0;i<fertilizers.length;i++){
        let elem = fertilizers[i];
        if(elem.year === year || elem.country === country){
            res.sendStatus(409,"Conflict");
        }
    }
    landusage_stats.push(req.body); 
    res.sendStatus(201, "CREATED"); 
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
    if(fertilizers.length===0){
        iniData.forEach((a)=>{
            landusage_stats.push(a);
        });
        res.send(JSON.stringify(fertilizers,null,2));
    }
    else{
        res.send(JSON.stringify(fertilizers,null,2));
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
    var fertilizersCountry = req.params.country;
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














}