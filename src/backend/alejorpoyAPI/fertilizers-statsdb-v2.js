
module.exports.register = (app) => {
    const BASE_API_URL = "/api/v1";
    const OWN_API_URL = "/fertilizers-stats";
    const path = require("path");
    const bodyParser = require("body-parser");
    var dbFile = path.join(__dirname,'fertilizers-stats.db');
    const Datastore = require('nedb');
    db1 = new Datastore({filename:dbFile,autoload:true});
    app.use(bodyParser.json());
    
    var fertilizers_stats = [];
    var fertilizers_stats_initial = [
        {
        country:"Afghanistan",
        year:2018,
        quantity:3.14,
        absolute_change:8.30,
        relative_change:296,
    },
    {  
        country:"Africa",
        year:2014,
        quantity:6.80,
        absolute_change:14.64,
        relative_change:50,
    },
    {  
        country:"Albania",
        year:2017,
        quantity:9.60,
        absolute_change:17.8,
        relative_change:463,
    },
    {  
        country:"Algeria",
        year:2017,
        quantity:45.1,
        absolute_change:2.30,
        relative_change:27,
    },
    {  
        country:"brasil",
        year:2017,
        quantity:15.7,
        absolute_change:6.225,
        relative_change:3.225,
    },
    {  
        country:"Americas",
        year:2014,
        quantity:20.3,
        absolute_change:6.41,
        relative_change:9,
    }
    ];
    
    //GET Datos Iniciales bien
    app.get(BASE_API_URL + OWN_API_URL + "/loadInitialData",(req,res)=>{
        db1.find({},function(err,docs){
            if(docs.length==0){
                db1.insert(fertilizers_stats_initial);
                console.log(`Datos iniciales : ${db1}`);
                return res.send(JSON.stringify(fertilizers_stats_initial,null,2));
            }
            else{ 
                return res.sendStatus(200);   
            }
        })
        
    });
    
    app.get(BASE_API_URL + OWN_API_URL + "/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/20091974/UVyn2eVu");
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
            dbquery['quantity'] = parseFloat(query.quantity);
        }
        if(query.absolute_change){
            dbquery['absolute_change'] = parseFloat(query.absolute_change);
        }
        if(query.relative_change){
            dbquery['relative_change'] = parseFloat(query.relative_change);
        }
        
        console.log(dbquery);
        db1.find(dbquery).skip(offset).limit(limit).exec((err,docs) =>{
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
        db1.remove({},{multi:true},function (err,docs){
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
            
        db1.find({country: data.country, year: parseInt(data.year)}, (err, docs) => {
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
    
        db1.remove({country:data.country,year:parseInt(data.year)},{multi:true},(err,docs) =>{
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
        
        if(!newData.country || !newData.year || !newData.quantity || !newData.absolute_change || !newData.relative_change){
            return res.sendStatus(400);
        }
        else{
            db1.update({country:data.country,year:parseInt(data.year)},newData,(err,docs) => {
                console.log(docs); 
                if(err){
                    console.log("prueba2");
                    return res.sendStatus(500);
                }
                else{
                    if(docs==0){
                        console.log("prueba");
                        return res.sendStatus(404,"NOT FOUND");
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
        
        db1.find({country:Dcountry,year:Dyear},function(err,data){
            if(err){
                return res.sendStatus(500);
            }
            else{
                if(data.length==0){
                    if(!newData.country || !newData.year || !newData.quantity || !newData.absolute_change || !newData.relative_change){
                        return res.sendStatus(400);
                    }
                    else{
                        db1.insert(newData);
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