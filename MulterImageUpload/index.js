import express from "express";
import multer from "multer";
import path from "path";

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "Images");
    },
    filename: (req, file, cd) => {
        console.log(file);
        cd(null, Date.now() + path.extname(file.originalname));
    }
});

const memoryStorage = multer.memoryStorage({})

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
    res.render("upload");
});

app.post("/upload", upload.single("image"), (req, res) => {
    res.send("Image Uploaded");
});

app.listen(3000);
console.log("3000 is the port");
