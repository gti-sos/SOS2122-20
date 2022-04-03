module.exports.register= (app)=>{

const path= require("path");
var BASE_API_URL = "/api/v1";
const bodyParser = require("body-parser");
var dbFile = path.join(__dirname,'fertilizers-stats.db');
const Datastore = require("nedb");
db = new Datastore({filename:dbFile,autoload:true});

app.use(bodyParser.json());

var fertilizers=[];


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
app.get(BASE_API_URL + "/fertilizers-stats/loadInitialData", (req, res) => {

    db.find({},function(err,docs){
        if(docs.length==0){
            db.insert(iniData);
            return res.send(JSON.stringify(iniData,null,2));
        }
        else{ 
            return res.sendStatus(200);
        }
    })

});

app.get(BASE_API_URL + "/fertilizers-stats/docs",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/20091974/UVyn2eVu");
})

//GET CONJUNTO bien
app.get(BASE_API_URL + "/fertilizers-stats", (req,res)=>{ 
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
    if(query.relative_change){
        dbquery['relative_change'] = parseFloat(query.relative_change);
    }
    if(query.absolute_change){
        dbquery['absolute_change'] = parseFloat(query.absolute_change);
    }
    if(query.quantity){
        dbquery['quantity'] = parseInt(query.quantity);
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

//GET ELEMENTO POR PAIS Y ANYO bien
app.get(BASE_API_URL + "/fertilizers-stats/:country/:year", (req,res)=>{
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
app.post(BASE_API_URL + "/fertilizers-stats/:country", (req,res)=>{
    res.sendStatus(405, "Method Not Allowed"); // devuelve codigo method not allowed
});

app.delete(BASE_API_URL + "/fertilizers-stats/:country/:year", (req,res)=>{ //borrar todos los recursos bien
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

app.put(BASE_API_URL + "/fertilizers-stats", (req,res)=>{ //bien
    res.sendStatus(400, "Bad Request"); 
});

// Actualización recurso concreto
app.put(BASE_API_URL+"/fertilizers-stats/:country/:year",(req,res)=>{
    var data = req.params;
    var newData = req.body;
    
    
    if(!newData.country || !newData.year || !newData.quantity || !newData.absolute_change || !newData.relative_change){
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











};


    













