var BASE_API_URL = "/api/v1";
var Datastore = require("nedb");
var path = require('path');

var dbFile = path.join(__dirname, 'fertilizers-stats.db');
var db = new Datastore({filename: dbFile, autoload: true });


module.exports.register = (app) => {
        var a=[
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

        //GET para los datos iniciales:
        app.get(BASE_API_URL + "/fertilizers-stats/loadInitialData",(req,res)=>{
            db.find({},function(err,docs){
                if(docs.length==0){
                    db.insert(a);
                    console.log(`Datos iniciales : ${db}`);
                    return res.send(JSON.stringify(a,null,2));
                }
                else{ 
                    return res.sendStatus(200);
                }
            })
        
        });


    app.get(BASE_API_URL + "/fertilizers-stats", (req, res) => {
        var query = req.query;
        if(query.hasOwnProperty("country")){
            query.country = query.country;
        }
        if(query.hasOwnProperty("year")){
            query.year = parseInt(query.year);
        }
        if(query.hasOwnProperty("quantity")){
            query.production = parseFloat(query.quantity);
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
app.get(BASE_API_URL +"/fertilizers-stats/:country/:year", (req,res)=>{
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
    app.delete(BASE_API_URL + "/fertilizers-stats", (req,res)=>{ 
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

    app.delete(BASE_API_URL +"/fertilizers-stats/:country/:year", (req,res)=>{
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

    app.post(BASE_API_URL+"/fertilizers-stats/:country",(req,res)=>{
        res.sendStatus(405,"METHOD NOT FOUND"); 
    });

   //POST CONJUNTO bien
app.post(BASE_API_URL + "/fertilizers-stats", (req,res)=>{
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
                if(!newData.country || !newData.year || !newData.quantity || !newData.absolute_change || !newData.relative_change){
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
    app.put(BASE_API_URL +"/fertilizers-stats", (req,res)=>{ 
        res.sendStatus(400, "Bad Request"); 
    });


app.put(BASE_API_URL+"/fertilizers-stats/:country/:year",(req,res)=>{
    var data = req.params;
    var newData = req.body;    
    if(!newData.country || !newData.year || !newData.quantity || !newData.relative_change || !newData.absolute_change){
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



    













