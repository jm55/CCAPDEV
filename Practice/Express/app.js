const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');

const PORT = 3000;

app.listen(PORT);

//setting static
app.use('/static', express.static(path.join(__dirname, 'public')))

//view engine via handelbars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    //res.status(200).send("Hello World"); //SEND
    //res.status(200).json({"message":"Hello World"}); //SEND JSON FORMAT 
    //res.status(200).download("app.js"); //DOWNLOAD FILE
    res.render('index', {title: 'This is Express Tutorial', name_en: "Momotetsu Nene", name: "桃鈴ねね",quote:'海外に気!!', img_src: '../static/img/nenechi.webp'});
});

console.log("This is app.js\nListening @ " + PORT);

