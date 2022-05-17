const express = require('express');
const exphbs = require('express-handlebars');

const port = 3000;

var fakePostDb = [
    // {epoch_time: 1652002412, subject: "hello", content: "test content..."},
];

const app = express();
// Set static folder
app.use(express.static(__dirname + "/public"));
// Set handlebars as the app's view engine.
// `{extname: 'hbs'}` informs the handlebars engine 
// that the file extension to read is .hbs 
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
// Set express' default file extension for views as .hbs
app.set("view engine", "hbs");
// Set the directory for the views
app.set("views", "./views");
// Set view cache to false so browsers wouldn't save views into their cache
app.set("view cache", false);

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render("index", {
        title: "homepage",
        name: "Jimmy"
    });
});

app.get("/list", (req, res) => {
    res.render("list", {
        title: "list",
        items: [
            { firstname: "John", lastname: "Smith" },
            { firstname: "Bob", lastname: "Morris" },
            { firstname: "Zark", lastname: "Muckerberg" }
        ]
    });
});

app.get("/yell", (req, res) => {
    var platform = req.get('sec-ch-ua-platform');
    
    res.render("yell", {
        title: "YELL",
        message: 'you are on '+ platform,
        helpers: {
            loud(text, options) { return text.toUpperCase(); }
        }
    });
});

app.get("/if", (req, res) => {
    res.render("if", {
        title: "If sample",
        showWeather: true,
        showTime: true,
        helpers: {
            date() { return new Date().toDateString(); }
        }
    });
})

app.post("/forms", (req, res, next) => {
    next(req);
});

// TODO: add forms, req, and fetch manipulation
app.get("/forms", (req, res) => {
    res.render("forms", {
        title: "Forms sample",
        posts: fakePostDb,
        helpers: {
            toDate(epoch) {return new Date(epoch).toDateString();},
            getDate() { return new Date().getTime(); }
        }
    });
});

// accept json request bodies
app.use(express.json());
app.post("/forms/add", (req, res) => {
    console.log("request received: ");
    console.log(req.body);
    try {
        fakePostDb.push({
            epoch_time: req.body['epoch'],
            subject: req.body['subject'],
            content: req.body['content']
        })
        res.sendStatus(200);
    } catch(e) {
        res.statusMessage = e;
        res.sendStatus(400);
    }
});

// 404 not found page
app.use((req, res, err) => {
    res.render("404", {
        title: "404 not found"
    });
});

app.listen(port, () => {
    console.log("Server now listening on port " + port);
});