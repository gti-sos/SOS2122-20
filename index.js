const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser =require("body-parser");

const BASE_API_URL = "/api/v1";

const app=express();
app.use(bodyParser.json());
const port = process.env.PORT || 8081;

app.use("/", express.static('public'));

app.get("/cool", (req,res)=>{
    console.log("Requested / faces route");
    res.send("<html><body><h1>"+cool()+"!</h1></body></html>")
});

app.get("/time", (req,res)=>{
    console.log("Requested / time route");
    res.send("<html><body><h1>"+cool()+"!</h1></body></html>")
});


app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});

// ALEJANDRO
var fertilizers =[
    {
        country:"afghanistan",
        year:2017,
        quantity:17.80

    },
    {
        country:"africa",
        year:2017,
        quantity:15.09
    }
];
app.get(BASE_API_URL+ "/fertilizers",(req,res)=>{
    res.send(JSON.stringify(fertilizers,null,2)); 

});


app.post(BASE_API_URL+ "/fertilizers",(req,res)=>{
    fertilizers.push(req.body);
    res.sendStatus(201,"CREATED"); 
}); 