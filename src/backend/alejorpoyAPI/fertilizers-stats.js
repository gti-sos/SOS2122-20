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




var aP=[];

app.get(BASE_API_URL +"/fertilizers-stats/docs",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/20091971/UVyn2z48");
})

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
app.get(BASE_API_URL+"/fertilizers-stats/loadInitialData",(req,res)=>{
    if(aP.length<5){
        a.forEach((a)=>{
            aP.push(a);
        });
            res.send(JSON.stringify(aP,null,2));
    }else{
            res.send(JSON.stringify(aP,null,2));
    }   
    
    });

//GET al conjunto:
app.get(BASE_API_URL+ "/fertilizers-stats",(req,res)=>{
    res.send(JSON.stringify(aP,null,2)); 

});

//POST al conjunto:
app.post(BASE_API_URL + "/fertilizers-stats", (req,res)=>{
    var newData = req.body;
    var year = req.body.year;
    var country = req.body.country;

    if(!newData.country ||
        !newData.year ||
        !newData.quantity ||
        !newData.absolute_change||
        !newData.relative_change){
        res.sendStatus(400,"Bad Request");
        }
    else{
        for(let i = 0;i<aP.length;i++){
            let elem = aP[i];
            if(elem.year === year && elem.country === country){
                res.sendStatus(409,"Conflict");
            }
        }
        aP.push(req.body); 
        res.sendStatus(201, "CREATED"); 
    }

    
});

//DELETE al conjunto:
app.delete(BASE_API_URL+"/fertilizers-stats",(req,res)=>{
    aP.splice(req.body);
    res.sendStatus(200, "OK");
});

//PUT al conjunto(nos devuelve error):
app.put(BASE_API_URL+"/fertilizers-stats", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

//PUT a un recurso concreto(pais y año):
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
        var index = aP.findIndex((reg) =>{
            return (reg.country == country && reg.year == year)
        })
        if(index == null){
            res.sendStatus(404,"NOT FOUND");
        }else if(country != body.country || year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var  update_productions = {...body};
            aP[index] = update_productions;

            res.sendStatus(200,"UPDATED");
        }
    }

});

//DELETE a un recurso concreto:
app.delete(BASE_API_URL +"/fertilizers-stats/:country", (req,res)=>{ //borrar todos los recursos
    var country = req.params.country; 
    aP=aP.filter((cont) =>{ 
        return (cont.country != country); 
    });
    res.sendStatus(200, "OK");
});
  
//POST a un recurso concreto(nos devuelve error):
app.post(BASE_API_URL+"/fertilizers-stats/:country",(req,res)=>{
    res.sendStatus(405,"METHOD NOT FOUND"); 
});

//GET a un recurso concreto:
app.get(BASE_API_URL +"/fertilizers-stats/:country", (req,res)=>{
    var country = req.params.country; 
    filteredCountry = a.filter((cont) =>{ 
        return (cont.country == country); 
    });
    if(filteredCountry == 0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredCountry, null,2));
    }
});

//GET por país y año
app.get(BASE_API_URL+"/fertilizers-stats/:country/:year", (req, res)=>{
    var country = req.params.country;
    var year = req.params.year;
    filter = aP.filter((c)=>{
        return(c.country == country && c.year == year);
    })
    if(filter == 0){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(filter[0],null,2));
    }
    res.sendStatus(200,"OK");
});


}