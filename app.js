const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.send("Hello");
})



app.listen(PORT, function(){
    console.log("Server started successfully.");
});