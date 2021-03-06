const { query } = require("express");

/*
API Daniel Puche Jimenez 
Landusage statistics V1
F06
*/
module.exports.register = (app) => {
const BASE_API_URL = "/api/v1";
const OWN_API_URL = "/landusage-stats";
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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
    country:"Brazil",
    code:"BRA",
    year:2016,
    "built-area":3358012,
    "grazing-area":196006800,
    "cropland-area":82297200,
},
{  
    country:"Brazil",
    code : "BRA",
    year:2015,
    "built-area":3289368,
    "grazing-area":196005400,
    "cropland-area":81855260,
},
{  
    country:"Canada",
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
    if(landusage_stats.length===0){
        landusage_stats_initial.forEach((a)=>{
            landusage_stats.push(a);
        });
        res.send(JSON.stringify(landusage_stats,null,2));
    }
    else{
        res.send(JSON.stringify(landusage_stats,null,2));
    }
   
});

app.get(BASE_API_URL + OWN_API_URL + "/docs",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/19481666/UVyn2eVt");
})

//GET CONJUNTO
app.get(BASE_API_URL + OWN_API_URL, (req,res)=>{ 
    var query = req.query;
    var landusage_stats_copy = landusage_stats;
    console.log(landusage_stats_copy);
    console.log("Peticion GET");
    console.log(query);
    var limit = query.limit;
    var offset = query.offset;

    for(q in query){
        if(q == 'year'){
            query[q] = parseInt(query[q]);
        }
        if(q == 'grazing-area'){
            query[q] = parseFloat(query[q]);
        }
        if(q=='built-area'){
            query[q] = parseFloat(query[q]);
        }
        if(q=='cropland-area'){
            query[q] = parseFloat(query[q]);
        }
    }
    delete query.offset;
    delete query.limit;
    if(!(query.length==0)){
        console.log("Hola");
        landusage_stats_copy = landusage_stats.filter((a) => {
        return (a['year'] == query['year']);})
        //res.send(JSON.stringify(landusage_stats_copy,null,2));
    }
    res.send(JSON.stringify(landusage_stats_copy, null,2)); // devuelve el conjunto 
});

//DELETE CONJUNTO
app.delete(BASE_API_URL + OWN_API_URL, (req,res)=>{ 
    landusage_stats = []; // deja vacio el conjunto
    console.log("HOLA");
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
    console.log(filteredCountry);
});

//GET ELEMENTO POR PAIS Y ANYO
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

//POST CONJUNTO // BIEN
app.post(BASE_API_URL + OWN_API_URL, (req,res)=>{
    var newData = req.body;
    var year = req.body.year;
    var country = req.body.country;

    for(let i = 0;i<landusage_stats.length;i++){
        let elem = landusage_stats[i];
        if(elem.year === year || elem.country === country){
            res.sendStatus(409,"Conflict");
        }
    }
    landusage_stats.push(req.body); // anyade lo que le pasemos en el cuerpo de la peticion
    res.sendStatus(201, "CREATED"); // devuelve codigo correcto
});

//POST RECURSO ERROR
app.post(BASE_API_URL + OWN_API_URL+ "/:country", (req,res)=>{
    res.sendStatus(405, "Method Not Allowed"); // devuelve codigo method not allowed
});

//DELETE CONJUNTO
app.delete(BASE_API_URL + OWN_API_URL, (req,res)=>{ 
    landusage_stats = []; // deja vacio el conjunto
    res.sendStatus(200, "OK"); // devuelve codigo correcto
});

//DELETE ELEMENTO POR PAIS
app.delete(BASE_API_URL + OWN_API_URL+"/:country", (req,res)=>{ //borrar todos los recursos
    var country = req.params.country; // pais de la peticion 
    landusage_stats = landusage_stats.filter((cont) =>{ // filtrar pais que coindice con la peticion
        return (cont.country != country); 
    });
    res.send(JSON.stringify(landusage_stats, null,2));
    res.sendStatus(200, "OK");
});

// DELETE ELEMENTO POR PAIS Y ANYO
app.delete(BASE_API_URL + OWN_API_URL+"/:country/:year", (req,res)=>{ //borrar todos los recursos
    var country = req.params.country; //pais de la peticion
    var yearName = req.params.year; //anyo de la peticion
    landusage_stats.filter((cont) =>{
        return (cont.country != country) && (cont.year != yearName); //comprobar que el pais y el anyo de la peticion coindice mediante filtrado
    });
    res.sendStatus(200, "OK"); // devolver codigo de ok 
});

app.put(BASE_API_URL + OWN_API_URL, (req,res)=>{ //borrar todos los recursos
    res.sendStatus(400, "Bad Request"); // devolver codigo de ok 
});

// Actualizaci??n recurso concreto
app.put(BASE_API_URL+OWN_API_URL+"/:country/:year",(req,res)=>{
    if(req.body.country == null |
        req.body.year == null | 
        req.body.code == null | 
        req.body.grazing-area == null | 
        req.body.cropland-area == null
        |
        req.body.built-area == null){
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
        }else if(country != body.country | year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var  update_landusage = {...body};
            landusage_stats[index] = update_landusage;

            res.sendStatus(200,"UPDATED");
        }
    }

});

//POST CONJUNTO
app.post(BASE_API_URL + OWN_API_URL, (req,res)=>{
    var newData = req.body;
    var year = req.body.year;
    var country = req.body.country;

    if(!newData.year ||
        !newData.country ||
        !newData.code ||
        !newData.built-area||
        !newData.grazing-area||
        !newData.cropland-area){
            res.sendStatus(400,"Bad Request");
        }
    else{
        for(let i = 0;i<landusage_stats.length;i++){
            let elem = landusage_stats[i];
            if(elem.year === year && elem.country === country){
                res.sendStatus(409,"Conflict");
            }
        }
        landusage_stats.push(req.body); // anyade lo que le pasemos en el cuerpo de la peticion
        res.sendStatus(201, "CREATED"); // devuelve codigo correcto
    }

    
});



//F05

}