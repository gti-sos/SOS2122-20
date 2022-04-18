const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser =require("body-parser");
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


    //API DANIEL PUCHE JIMENEZ
var landusage_statsV1 = require("./src/backend/danpucjimAPI/landusage-stats.js");
landusage_statsV1.register(app);

    //API ALEJANDRO JORGE POYUELO
    var fertilizers_statsV1 = require("./src/backend/alejorpoyAPI/fertilizers-statsdb.js");
    fertilizers_statsV1.register(app);

    //API JAVIER LARA PARRILLA
    var fertilizers_statsV1 = require("./src/backend/javlarparAPI/agricultural-stats.js");
    fertilizers_statsV1.register(app);
