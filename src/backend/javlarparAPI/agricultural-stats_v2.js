module.exports.register = (app) => {
    const BASE_API_URL = "/api/v1";
    const OWN_API_URL = "/agriculturalproduction-stats";
    const path = require("path");
    const bodyParser = require("body-parser");
    var dbFile = path.join(__dirname,'agriculturalproduction-stats.db');
    const Datastore = require('nedb');
    db = new Datastore({filename:dbFile,autoload:true});
    app.use(bodyParser.json());
    
    var fertilizers_stats = [];
    var agricultural_stats_initial = [
        {
            country:"Afghanistan",
            year: 2018,
            production: 4.02,
            absolute_change:434.520,
            relative_change:"12%"
        },
        {
            country:"Africa",
            year: 2018,
            production: 191.56,
            absolute_change:146.68,
            relative_change:"327%"
        },
        {
            country:"Albania",
            year: 2018,
            production: 678.196,
            absolute_change:385.797,
            relative_change:"132%"
        },
        {
            country:"Argeria",
            year: 2018,
            production: 6.06,
            absolute_change:5.13,
            relative_change:"549%"
        },
        {
            country:"Americas",
            year: 2018,
            production: 763.59,
            absolute_change:539.36,
            relative_change:"241%"
        }
    ];
    
    //GET Datos Iniciales bien
    app.get(BASE_API_URL + OWN_API_URL + "/loadInitialData",(req,res)=>{
        db.find({},function(err,docs){
            if(docs.length==0){
                db.insert(agricultural_stats_initial);
                console.log(`Datos iniciales : ${db}`);
                return res.send(JSON.stringify(agricultural_stats_initial,null,2));
            }
            else{ 
                return res.sendStatus(200);   
            }
        })
        
    });
    
    app.get(BASE_API_URL + OWN_API_URL + "/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/20091971/UVysxbUP");
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
        if(query.quantity){
            dbquery['production'] = parseFloat(query.production);
        }
        if(query.absolute_change){
            dbquery['absolute_change'] = parseFloat(query.absolute_change);
        }
        if(query.relative_change){
            dbquery['relative_change'] = parseFloat(query.relative_change);
        }
        
        console.log(dbquery);
        db.find(dbquery).skip(offset).limit(limit).exec((err,docs) =>{
            console.log(docs);
            if(err){
                res.sendStatus(500);
            }
            else{
                if(docs == 0){
                    docs.forEach((data) => {
                        delete data._id;
                    });
                    res.status(200).send(JSON.stringify(docs,null,2));
                    //res.sendStatus(404);
                }
                else{
                    docs.forEach((data) => {
                        delete data._id;
                    });
                    res.status(200).send(JSON.stringify(docs,null,2));
                }
            }
        })
        
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
        if(!newData.country || !newData.year || !newData.production || !newData.absolute_change || !newData.relative_change){
            return res.sendStatus(400);
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
                    if(!newData.country || !newData.year || !newData.production || !newData.absolute_change || !newData.relative_change){
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
    
    
    

    
    }