import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import exphbs from 'express-handlebars';

const port = 3000;

var fakePostDb = [
    {author: hash("test_user" + 1652002411), post_id: hash(String(1652002412)), epoch_time: 1652002412, subject: "hello", content: "test content", "like": 0, id: '194895533'},
];

var fakeUserDb = [
    {user_id: hash("test_user" + 1652002411), name: "test user", username: "test.user"}
];

var fakeCommentDb = [];

var loggedIn = {user_id: hash("loggedInUser" + 1653358788), name: "Foo Bar", username: "foo.bar"};
fakeUserDb.push(loggedIn);

fakeCommentDb.push({author: loggedIn.user_id, comment_id: hash(loggedIn.user_id+String(1653358798)), post_id: hash(String(1652002412)), comment_text: "this is test comment"});

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
// Enable JSON reading capability
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/home');
    checkData();
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
            { firstname: "John", lastname: "Smith", age:30, sex:'M'},
            { firstname: "Bob", lastname: "Morris" , age:28, sex:'M'},
            { firstname: "Zark", lastname: "Muckerberg", age:32, sex:'M'}
        ]
    });
});

app.get("/yell", (req, res) => {
    var platform = req.get('sec-ch-ua-platform');
    
    res.render("yell", {
        title: "YELL",
        message: 'you are on '+ platform,
        helpers: {
            loud(text, options) { return text.toUpperCase();} //called on at alert('{{{loud message}}}') where message is the text
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
        user: loggedIn,
        posts: fakePostDb,
        comments: fakeCommentDb,
        helpers: {
            toDate(epoch) {return new Date(epoch).toDateString();},
            getDate() { return new Date().getTime();},
            likeBtnID(id){ return "likeBtn" + id; },
            likeID(id){ return "like" + id; },
            commentBtnID(id){ return "commentBtn" + id;},
            commentFieldID(id){ return "commentField" + id;},
            pluralInator(word,likeval,){
                if(likeval > 1)
                    return word + "s";
                return word;
            }
        }
    });
    checkData();
});

// accept json request bodies
app.post("/forms/add", (req, res) => {
    console.log("new post received: ");
    console.log(req.body);
    try {
        fakePostDb.push({
            epoch_time: req.body['epoch'],
            subject: req.body['subject'],
            content: req.body['content'],
            like: req.body['like'],
            id: hash(String(req.body['epoch'])),
            author: req.body['user_id']
        });
        res.sendStatus(200);
    } catch(e) {
        res.statusMessage = e;
        res.sendStatus(400);
    }
    console.log("posts: ");
    console.log(fakePostDb);
});

// update like
app.put("/forms/like", (req, res) => {
    console.log("like received: ");
    console.log(req.body);
    try {
        for(var i = 0; i < fakePostDb.length; i++){
            if(fakePostDb[i].id == req.body["id"])
                fakePostDb[i].like = req.body["like"];
        }
        res.sendStatus(200);
    } catch(e) {
        res.statusMessage = e;
        res.sendStatus(400);
    }
    console.log("posts: ");
    console.log(fakePostDb);
});

// update like
app.put("/forms/comment", (req, res) => {
    console.log("like received: ");
    console.log(req.body);
    try {
        for(var i = 0; i < fakePostDb.length; i++){
            if(fakePostDb[i].id == req.body["id"])
                fakePostDb[i].like = req.body["like"];
        }
        res.sendStatus(200);
    } catch(e) {
        res.statusMessage = e;
        res.sendStatus(400);
    }
    console.log("posts: ");
    console.log(fakePostDb);
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

function hash(s) {
    /* Simple hash function. */
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
}

function checkData(){
    console.log("============================================");
    console.log(fakeUserDb);
    console.log(fakePostDb);
    console.log(fakeCommentDb);
    console.log("Logged in as: ");
    console.log(loggedIn);
    console.log("============================================");
}