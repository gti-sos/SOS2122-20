var BASE_API_URL = "/api/v1";
var Datastore = require("nedb");
var path = require('path');

var dbFile = path.join(__dirname, 'agriculturalproduction-stats.db');
var db = new Datastore({filename: dbFile, autoload: true });

//Variable
var agriculturalP=[];
module.exports.register = (app) => {
        var agriculturalproduction_stats=[
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

        //GET para los datos iniciales:
        app.get(BASE_API_URL + "/agriculturalproduction-stats/loadInitialData",(req,res)=>{
            db.find({},function(err,docs){
                if(docs.length==0){
                    db.insert(agriculturalproduction_stats);
                    console.log(`Datos iniciales : ${db}`);
                    return res.send(JSON.stringify(agriculturalproduction_stats,null,2));
                }
                else{ 
                    return res.sendStatus(200);
                }
            })
        
        });

        app.get(BASE_API_URL +"/agriculturalproduction-stats/docs",(req,res)=>{
            res.redirect("https://documenter.getpostman.com/view/20091971/UVysxbUP");
        })

    app.get(BASE_API_URL + "/agriculturalproduction-stats", (req, res) => {
        var query = req.query;
        if(query.hasOwnProperty("country")){
            query.country = query.country;
        }
        if(query.hasOwnProperty("year")){
            query.year = parseInt(query.year);
        }
        if(query.hasOwnProperty("production")){
            query.production = parseFloat(query.production);
        }
        if(query.hasOwnProperty("absolute_change")){
            query.absolute_change = parseFloat(query.absolute_change);
        }
        if(query.hasOwnProperty("relative_change")){
            query.relative_change = parseFloat(query.relative_change);
        }
        if (query.offset) { 
            var offset = parseInt(query.offset);
            delete req.query.offset;
        }
        if (query.limit) { 
            var limit = parseInt(req.query.limit);
            delete query.limit;
        }
        console.log(`new query ${JSON.stringify(query, null,2)} with offset ${offset} and limit ${limit}` );
        db.find(query).skip(offset).limit(limit).exec((err, dataInDB) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else{
                if(dataInDB == 0){
                    console.error("No data found");
                    res.sendStatus(404);
                }
                else{
                    dataInDB.forEach( (data) =>{ delete data._id; });
                    res.status(200).send(JSON.stringify(dataInDB, null, 2));
                    console.log("GET resource:"+JSON.stringify(dataInDB, null, 2));
                }
            }
        });
    });

    //GET por país y año
app.get(BASE_API_URL +"/agriculturalproduction-stats/:country/:year", (req,res)=>{
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

    //DELETE CONJUNTO bien
    app.delete(BASE_API_URL + "/agriculturalproduction-stats", (req,res)=>{ 
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

    app.delete(BASE_API_URL +"/agriculturalproduction-stats/:country/:year", (req,res)=>{
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

    app.post(BASE_API_URL+"/agriculturalproduction-stats/:country",(req,res)=>{
        res.sendStatus(405,"METHOD NOT FOUND"); 
    });

   //POST CONJUNTO bien
app.post(BASE_API_URL + "/agriculturalproduction-stats", (req,res)=>{
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
    app.put(BASE_API_URL +"/agriculturalproduction-stats", (req,res)=>{ 
        res.sendStatus(400, "Bad Request"); 
    });


app.put(BASE_API_URL+"/agriculturalproduction-stats/:country/:year",(req,res)=>{
    var data = req.params;
    var newData = req.body;    
    if(!newData.country || !newData.year || !newData.production || !newData.relative_change || !newData.absolute_change){
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
    }

