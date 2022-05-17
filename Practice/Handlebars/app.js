const express = require('express');
const hbs = require('express-handlebars');

const PORT = 3000;

const app = express();

app.use(express.static(__dirname + "/public"));

app.listen(PORT, ()=>{
    console.log("Server port: " + PORT);
});

app.get('/',(req,res)=>{
    res.send("");
    console.log("Get /");
});