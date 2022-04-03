module.exports.register =(app)=>{

const path= require("path");
var BASE_API_URL = "/api/v1";
var OWN_API_URL = "/fertilizers-stats";
const bodyParser = require("body-parser");
var dbFile = path.join(__dirname,'fertilizers-stats.db');
const Datastore = require("nedb");
db = new Datastore({filename:dbFile,autoload:true});


var fertilizers =[];

app.use(bodyParser.json());

var fertilizers_initial=[
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


    app.get(BASE_API_URL + OWN_API_URL +"/loadInitialData", (req, res) => {
        db.insert(fertilizers_initial);
        res.send(JSON.stringify(fertilizers, null, 2));
    });

    app.get(BASE_API_URL + "/fertilizers-stats",(req, res)=>{
    
        var year = req.query.year;
        var from = req.query.from;
        var to = req.query.to;

         //Comprobamos query

        for(var i = 0; i<Object.keys(req.query).length;i++){
        var element = Object.keys(req.query)[i];
        if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }
    }

      //Comprobamos si from es mas pequeño o igual a to
      if(from>to){
        res.sendStatus(400, "BAD REQUEST");
        return;
    }

    db.find({},function(err, newRegis){

        if(err){
            res.sendStatus(500, "ERROR EN CLIENTE");
            return;
        }

    // Apartado para búsqueda por año
        
    if(year != null){
        var newRegis = newRegis.filter((reg)=>
        {
            return (reg.year == year);
        });
        if (newRegis==0){
            res.sendStatus(404, "NO EXISTE");
            return;
        }
    }

    // Apartado para from y to
            
    if(from != null && to != null){
        newRegis = newRegis.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });

        if (newRegis==0){
            res.sendStatus(404, "NO EXISTE");
            return;
        }    

        
    }
    // RESULTADO

    if(req.query.limit != undefined || req.query.offset != undefined){
        newRegis = paginacion(req,newRegis);
    }
    newRegis.forEach((element)=>{
        delete element._id;
    });
    res.send(JSON.stringify(newRegis,null,2));
})
});

app.get(BASE_API_URL + OWN_API_URL + "/docs",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/20091974/UVyn2eVu");
})


// GET por país
    
app.get(BASE_API_URL + OWN_API_URL +"/:country",(req, res)=>{
    
    var country =req.params.country;
    var from = req.query.from;
    var to = req.query.to;

    //Comprobamos query
    for(var i = 0; i<Object.keys(req.query).length;i++){
        var element = Object.keys(req.query)[i];
        if(element != "from" && element != "to"){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }
    }

    //Comprobamos si from es mas pequeño o igual a to
    if(from>to){
        res.sendStatus(400, "BAD REQUEST");
        return;
    }

    db.find({}, function(err,newRegis){
        
        if(err){
            res.sendStatus(500, "ERROR EN CLIENTE");
            return;
        }

        newRegis = newRegis.filter((reg)=>
        {
            return (reg.country == country);
        });
    
        // Apartado para from y to
        var from = req.query.from;
        var to = req.query.to;

        //Comprobamos si from es mas pequeño o igual a to
        if(from>to){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }
    
        if(from != null && to != null && from<=to){
            newRegis = newRegis.filter((reg)=>
            {
               return (reg.year >= from && reg.year <=to);
            }); 
            
        }
        //COMPROBAMOS SI EXISTE
        if (newRegis==0){
            res.sendStatus(404, "NO EXISTE");
            return;
        }
        //RESULTADO
        if(req.query.limit != undefined || req.query.offset != undefined){
            newRegis = paginacion(req,newRegis);
        }
        newRegis.forEach((element)=>{
            delete element._id;
        });
        res.send(JSON.stringify(newRegis,null,2));
    })

});


// GET por país y año
    
app.get(BASE_API_URL+ OWN_API_URL +"/:country/:year",(req, res)=>{
    
    var country =req.params.country
    var year = req.params.year

    db.find({},function(err, newRegis){

        if(err){
            res.sendStatus(500, "ERROR EN CLIENTE");
            return;
        }

        newRegis = newRegis.filter((reg)=>
        {
            return (reg.country == country && reg.year == year);
        });
        if (newRegis==0){
            res.sendStatus(404, "NO EXISTE");
            return;
        }


    //RESULTADO
    
            //Paginación
            if(req.query.limit != undefined || req.query.offset != undefined){
                newRegis = paginacion(req,newRegis);
                res.send(JSON.stringify(newRegis,null,2));
            }
            newRegis.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(newRegis[0],null,2));
        });

    });


    function paginacion(req, lista){

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;
        
        if(limit < 1 || offset < 0 || offset > lista.length){
            res.push("ERROR EN PARAMETROS LIMIT Y/O OFFSET");
            return res;
        }

        res = lista.slice(offset,parseInt(limit)+parseInt(offset));
        return res;

    };


    app.post(BASE_API_URL + OWN_API_URL, (req, res)=>{
        
        if(parametroscorrectos(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{

            db.find({},function(err,regisNew){

                if(err){
                    res.sendStatus(500, "ERROR EN CLIENTE");
                    return;
                }

                regisNew = regisNew.filter((reg)=>
                {
                    return(req.body.country == reg.country && req.body.year == reg.year)
                })
            
                if(regisNew.length != 0){
                    res.sendStatus(409,"CONFLICT");
                }else{
                    db.insert(req.body);
                    res.sendStatus(201,"CREATED");
                }
            })
        }
    
    });

    app.post(BASE_API_URL + OWN_API_URL +"/:country", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });
    app.post(BASE_API_URL +  OWN_API_URL +"/:year", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });

    function parametroscorrectos(req) {
        return (req.body.country == null |
            req.body.year == null |
            req.body.quantity == null |
            req.body.absolute_change == null |
            req.body.relative_change == null);
    };

    app.delete(BASE_API_URL + OWN_API_URL, (req, res) => {
        fertilizers = [];
        res.sendStatus(200, "OK");
    });


    app.delete(BASE_API_URL + OWN_API_URL+ "/:country", (req, res) => { //borrar todos los recursos
        var countryName = req.params.country;
        fertilizers.filter((cont) => {
            return (cont.country != countryName);
        });
        res.sendStatus(200, "OK");
    });


    app.delete(BASE_API_URL + OWN_API_URL+ "/:country/:year",(req, res)=>{
        var countryR = req.params.country;
        var yearR = req.params.year;

        db.find({country: countryR, year: parseInt(yearR)}, {}, (err, regisNew)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            if(regisNew==0){
                res.sendStatus(404,"NOT FOUND");
                return;
            }
            db.remove({country: countryR, year: yearR}, {}, (err, numRemoved)=>{
                if (err){
                    res.sendStatus(500,"ERROR EN CLIENTE");
                    return;
                }
            
                res.sendStatus(200,"DELETED");
                return;
                
            });
        });

    })

    app.put(BASE_API_URL + "/registration-stats", (req, res) => {
        res.sendStatus(405, "Method Not Allowed");
    });

    app.put(BASE_API_URL + OWN_API_URL +"/:country/:year",(req, res)=>{
        
        //COMPROBAMOS FORMATO JSON

        if(parametroscorrectos(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
            return;
        }
        
        var countryRegis = req.params.country;
        var yearRegis = req.params.year;
        var body = req.body;  

        db.find({},function(err,regisNew){
            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            //COMPROBAMOS SI EXISTE EL ELEMENTO

            regisNew = regisNew.filter((reg)=>
            {
                return (reg.country == countryRegis && reg.year == yearRegis);
            });
            if (regisNew==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }

            //COMPROBAMOS SI LOS CAMPOS ACTUALIZADOS SON IGUALES

            if(countryRegis != body.country || yearRegis != body.year){
                res.sendStatus(400,"BAD REQUEST");
                return;
            }

            //ACTUALIZAMOS VALOR
                
            db.update({$and:[{country: String(countryRegis)}, {year: parseInt(yearRegis)}]}, {$set: body}, {},function(err, numUpdated) {
                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                }else{
                    res.sendStatus(200,"UPDATED");
                }
            });
        })
    })
};


    












