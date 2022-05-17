//Reference: https://stackoverflow.com/a/15773267

console.log("App.js");

const http = require("http");
const path = require("path"); //'system paths'
const fs = require("fs"); //file system
const multer = require("multer"); //multipart-formdata

const express = require("express"); //express server

const app = express();
//const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

// you might also want to set some limits: https://github.com/expressjs/multer#limits
const upload = multer({dest: "./temp"});

const handleError = (err, res) => {
    //console.log(err);
    res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

app.set("view cache", false);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/", express.static(path.join(__dirname, "./public"))); //sends index.html as default page

app.post("/upload",upload.single("file"),(req, res) => { //param of upload.single() is name of form on page
    const tempPath = req.file.path;
    console.log(tempPath);

    const targetPath = path.join(__dirname, "./uploads/" + new Date().toISOString() + ".jpg");
    console.log(targetPath);

    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
        console.log("Read as jpg");
        fs.rename(tempPath, targetPath, err => {
            if(err)
                return handleError(err, res);
            res.status(200).contentType("text/plain").end("File uploaded!");
        });
    } else {
        fs.unlink(tempPath, err => {
            if(err)
                return handleError(err, res);
            res.status(403).contentType("text/plain").end("Only .jpg files are allowed!");
        });
    }
  }
);


