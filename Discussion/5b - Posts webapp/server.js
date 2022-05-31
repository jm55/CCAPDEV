import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// server modules
import express from 'express';
import exphbs from 'express-handlebars';
// db modules
import { connectToServer }  from './db/conn.js';
// Routers
import navRoutes from './routes/navigation.js';
import postRoutes from './routes/posts.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
// Set static folder
app.use(express.static(__dirname + "/public"));
// Set handlebars as the app's view engine.
app.engine("hbs", exphbs.engine({
    extname: 'hbs'
}));
// Set express' default file extension for views as .hbs
app.set("view engine", "hbs");
// Set the directory for the views
app.set("views", "./views");
// Set view cache to false so browsers wouldn't save views into their cache
app.set("view cache", false);

// Assign routes
app.use(navRoutes);
app.use(postRoutes);

// 404 not found page
app.use((req, res, err) => {
    res.render("404", {
        title: "404 not found"
    });
});

connectToServer((err) => {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log("Successful connection");

    app.listen(process.env.SERVER_PORT, () => {
        console.log("server now listening...");
    })

});

