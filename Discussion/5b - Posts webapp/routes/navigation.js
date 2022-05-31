import express from 'express';

const navRoutes = express.Router();

navRoutes.get('/', (req, res) => {
    res.redirect('/home');
});


navRoutes.get('/home', (req, res) => {
    res.render("index", {
        title: "homepage",
        name: "Jimmy"
    });
});

navRoutes.get("/list", (req, res) => {
    res.render("list", {
        title: "list",
        items: [
            { firstname: "John", lastname: "Smith" },
            { firstname: "Bob", lastname: "Morris" },
            { firstname: "Zark", lastname: "Muckerberg" }
        ]
    });
});

navRoutes.get("/yell", (req, res) => {
    var platform = req.get('sec-ch-ua-platform');
    
    res.render("yell", {
        title: "YELL",
        message: 'you are on '+ platform,
        helpers: {
            loud(text, options) { return text.toUpperCase(); }
        }
    });
});

navRoutes.get("/if", (req, res) => {
    res.render("if", {
        title: "If sample",
        showWeather: false,
        showTime: true,
        helpers: {
            date() { return new Date().toDateString(); }
        }
    });
})

export default navRoutes;