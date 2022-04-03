module.exports= (app, BASE_API_URL, bodyParser,db)=>{
    app.use(bodyParser.json());
    var fertilizers=[];
    const API_FERT_DOC= "https://sos2122-20.herokuapp.com/api/v1/fertilizers-stats/docs";

    app.get(BASE_API_URL + "/fertilizers-stats/docs",(req,res)=>{
        res.redirect(API_FERT_DOC);
    })

    // DATOS