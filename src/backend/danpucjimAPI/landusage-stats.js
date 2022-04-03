
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
var dbFile = path.join(__dirname,'landusage-stats.db');
const Datastore = require('nedb');
db = new Datastore({filename:dbFile,autoload:true});
app.use(bodyParser.json());

var landusage_stats = [];
var landusage_stats_initial = [
    {
    country:"Africa",
    code : "",
    year:2016,
    built_area:6235010,
    grazing_area:888088030,
    cropland_area:296972060,
},
{  
    country:"Brazil",
    code:"BRA",
    year:2016,
    built_area:3358012,
    grazing_area:196006800,
    cropland_area:82297200,
},
{  
    country:"Brazil",
    code : "BRA",
    year:2015,
    built_area:3289368,
    grazing_area:196005400,
    cropland_area:81855260,
},
{  
    country:"Canada",
    code: "CAN",
    year:2016,
    built_area:435730,
    grazing_area:14030090,
    cropland_area:47912430,
},
{  
    country:"Canada",
    code : "CAN",
    year:2014,
    built_area:421859,
    grazing_area:14300740,
    cropland_area:47771180,
}
];

//GET Datos Iniciales bien
app.get(BASE_API_URL + OWN_API_URL + "/loadInitialData",(req,res)=>{
    db.find({},function(err,docs){
        if(docs.length==0){
            db.insert(landusage_stats_initial);
            console.log(`Datos iniciales : ${db}`);
            return res.send(JSON.stringify(landusage_stats_initial,null,2));
        }
        else{ 
            return res.sendStatus(200);   
        }
    })
    
});

app.get(BASE_API_URL + OWN_API_URL + "/docs",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/19481666/UVyn2eVt");
})

//GET CONJUNTO bien
app.get(BASE_API_URL + OWN_API_URL, (req,res)=>{ 
    var query = req.query;
    dbquery = {};
    console.log("Peticion GET");
    console.log(query.year);
    var limit = Number.MAX_SAFE_INTEGER;
    var offset = 0;
    if(query.offset){
        offset = parseInt(query.offset);
        console.log(offset);
        delete query.offset;
    }
    if(query.limit){
        limit = parseInt(query.limit);
        delete query.limit;
    }
    if(query.year){
        dbquery['year'] = parseInt(query.year);
        console.log(offset);
    }
    if(query.cropland_area){
        dbquery['cropland_area'] = parseFloat(query.cropland_area);
    }
    if(query.grazing_area){
        dbquery['grazing_area'] = parseFloat(query.grazing_area);
    }
    if(query.built_area){
        dbquery['built_area'] = parseFloat(query.built_area);
    }
    
    console.log(dbquery);
    db.find(dbquery).skip(offset).limit(limit).exec((err,docs) =>{
        console.log(docs);
        if(err){
            res.sendStatus(500);
        }
        else{
            if(docs == 0){
                res.sendStatus(404);
            }
            else{
                docs.forEach((data) => {
                    delete data._id;
                });
                res.status(200).send(JSON.stringify(docs,null,2));
            }
        }
    })
    //res.send(JSON.stringify(landusage_stats_copy, null,2)); // devuelve el conjunto 
});

//DELETE CONJUNTO bien
app.delete(BASE_API_URL + OWN_API_URL, (req,res)=>{ 
    db.remove({},{multi:true},function (err,docs){
        if(err){
            res.sendStatus(500);
        }
        else{
            if(docs==0){
                res.sendStatus(404);
            }
            else{
                res.sendStatus(200);
            }
        }
    })
});

//GET ELEMENTO POR PAIS Y ANYO bien
app.get(BASE_API_URL + OWN_API_URL+"/:country/:year", (req,res)=>{
    var data = req.params; //parametro solicitado
        
    db.find({country: data.country, year: parseInt(data.year)}, (err, docs) => {
        if (err) {
            res.sendStatus(500);
        } else {
            if (docs == 0) {
                res.sendStatus(404);
            } else {
                delete docs[0]._id;
                res.status(200).send(JSON.stringify(docs[0], null, 2));
            }
        }
    });
});

//POST RECURSO ERROR bien
app.post(BASE_API_URL + OWN_API_URL+ "/:country", (req,res)=>{
    res.sendStatus(405, "Method Not Allowed"); // devuelve codigo method not allowed
});

app.delete(BASE_API_URL + OWN_API_URL+"/:country/:year", (req,res)=>{ //borrar todos los recursos bien
    var data = req.params;

    db.remove({country:data.country,year:parseInt(data.year)},{multi:true},(err,docs) =>{
        if(err){
            res.sendStatus(500);
        }
        else{
            if(docs == 0){
                res.sendStatus(404);
            }
            else{
                res.sendStatus(200);
            }
        }
    })
});

app.put(BASE_API_URL + OWN_API_URL, (req,res)=>{ //bien
    res.sendStatus(400, "Bad Request"); 
});

// Actualización recurso concreto
app.put(BASE_API_URL+OWN_API_URL+"/:country/:year",(req,res)=>{
    var data = req.params;
    var newData = req.body;
    //console.log(`Parametros ${data.year} Cuerpo ${newData.year}`);
    
    if(!newData.country || !newData.year || !newData.cropland_area || !newData.grazing_area || !newData.built_area){
        return sendStatus(400);
    }
    else{
        db.update({country:data.country,year:parseInt(data.year)},newData,(err,docs) => {
            console.log(docs);
            if(err){
                console.log("prueba2");
                return res.sendStatus(500);
            }
            else{
                if(docs==0){
                    console.log("prueba");
                    return res.sendStatus(404);
                }
                else{
                    return res.sendStatus(200);
                }
            }
        });
    }   
});

//POST CONJUNTO bien
app.post(BASE_API_URL + OWN_API_URL, (req,res)=>{
    var newData = req.body;
    console.log(newData.country);
    var Dyear = req.body.year;
    var Dcountry = req.body.country;
    
    db.find({country:Dcountry,year:Dyear},function(err,data){
        if(err){
            return res.sendStatus(500);
        }
        else{
            if(data.length==0){
                if(!newData.country || !newData.year || !newData.built_area || !newData.grazing_area || !newData.cropland_area){
                    return res.sendStatus(400);
                }
                else{
                    db.insert(newData);
                    return res.sendStatus(201);
                }
            }
            else{
                return res.sendStatus(409);
            } 
        }
    })
});



//F05

}