const express = require("express");
const cool = require("cool-ascii-faces");

const port = process.env.port; 
const app = express();
var cool1 = cool();


app.use("/",express.static('public'));
app.get("/route2",(req,res)=>{
    console.log("Requested / route")
    res.send("<html><body>Hola</body></html>")
});

app.get("/cool",(req,res)=>{
    console.log("Requested / route")
    res.send("<html><body><h1>"+cool()+"</h1></body></html>")
})

app.listen(port,() => {
    console.log(`Server Ready at : ${port}`);
});

console.log(`Server Ready  at : ${port}`);
