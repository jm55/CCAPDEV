import express from 'express';
import { getPosts, addPost } from '../db/controllers/posts.js';

const postRoutes = express.Router();

postRoutes.get("/forms", (req, res) => {
    getPosts().then( data => {
        console.log("data: ");
        console.log(data);

        res.render("forms", {
            title: "Forms sample",
            posts: data,
            helpers: {
                toDate(epoch) {return new Date(epoch).toDateString();},
                getDate() { return new Date().getTime(); }
            }
        });
    }).catch (err => {
        console.error('Error encountered in getPosts: '+ err);
        res.sendStatus(500);
    });
});

// accept json request bodies
postRoutes.use(express.json());

postRoutes.post("/forms", (req, res) => {
    console.log("request received: ");
    console.log(req.body);
    addPost({
        epoch_time: req.body['epoch'],
        subject: req.body['subject'],
        content: req.body['content']
    }).then( () => {
        console.log('post request successful');
        res.sendStatus(200);
    }).catch( (e) => {
        res.statusMessage = e;
        res.sendStatus(400);
    });
});

export default postRoutes;