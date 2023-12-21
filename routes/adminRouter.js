import express from "express";
import SessionJs from "sessionjs";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import DatabaseController from "../database/DatabaseController.js";

const saltRounds = 10;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/imgs');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const dbc = new DatabaseController();
const adminRouter = express.Router();
let session = new SessionJs();

adminRouter.post("/login", async (req, res) => {
    let username = req.body.username;
    const users = await dbc.getUser(username);

    if (users.length == 0) {
        console.log("Failed to login");
        res.json({
            status: 'error',
            message: 'Failed to login'
        });
    } else {
        users.forEach((user) => {
            bcrypt.compare(req.body.password, user.password, async (err, result) => {
                if (result) {
                    let sessionId = session.start(user);
                    res.cookie('sessionId', sessionId);
                    res.json({
                        status: 'ok',
                        data: sessionId
                    });
                } else {
                    console.log("Failed to login");
                    res.json({
                        status: 'error',
                        message: 'Failed to login'
                    });
                }
            });
        });
    }
});

adminRouter.use((req, res, next) => {
    let sessionId = req.cookies['sessionId'];
    
    if(session.validate(sessionId)){
        req.thisSession = session.validate(sessionId);
        next();
    }
    else{
        res.render('./admin/loginView');
    }
});

adminRouter.get("/admin", async (req, res) => {
    const blogs = await dbc.getBlogs();
    res.render('./admin/adminView', { blogPosts: blogs });
});

adminRouter.get("/settings", (req, res) => {
    res.render('./admin/settingsView', );
});

adminRouter.post("/updateUser", (req, res) => {
    let newUsername = req.body.newUsername;
    let password = req.body.password;
    let thisSession = req.thisSession;
    let sessionId = session.getSessionId(thisSession);
    const user = session.getUser(sessionId);

    newUsername = newUsername || user.username;
    password = password || user.password;

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            res.json({
                status: 'error'
            });
        } else {
            const newUser = {
                id: user.id,
                username: newUsername,
                password: hashedPassword
            };

            let check = session.updateUser(sessionId, newUser);
            dbc.updateUser(newUser);

            res.json({
                status: 'ok'
            });
        }
    });
});

adminRouter.post("/newBlogPost", upload.single('image'), (req, res) => {
    let title = req.body.title;
    let category = req.body.category;
    let example = req.body.example;
    let creator = req.body.creator;
    let text = req.body.text;

    let imageURL = req.file ? '/imgs/' + req.file.filename : '';

    let blog = {
        title: title,
        category: category,
        example: example,
        image: imageURL,
        creator: creator,
        text: text
    };

    dbc.createBlog(blog);

    res.redirect('/admin');
});

adminRouter.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const post = await dbc.getBlog(id);
    res.render('./admin/editBlogPost.ejs', { blogPost: post[0] });
});

adminRouter.post("/updatePost", upload.single('image'), async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const category = req.body.category;
    const example = req.body.example;
    const creator = req.body.creator;
    const text = req.body.text;
    let imageURL;

    if(req.file == undefined){
        console.log("No image uploaded");
        const post = await dbc.getBlog(id);
        imageURL = post[0].image;
    }
    else{
        console.log("Image uploaded");
        imageURL = req.file ? '/imgs/' + req.file.filename : '';
    }

    let blog = {
        id: id,
        title: title,
        category: category,
        example: example,
        image: imageURL,
        creator: creator,
        text: text
    };

    dbc.updateBlog(blog);

    res.json({
        status: 'ok'
    });
});

adminRouter.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    dbc.deleteBlog(id);
    res.redirect('/admin');
});

adminRouter.get("/logout", (req, res) => {
    let sessionId = req.cookies['sessionId'];
    session.end(sessionId);
    res.redirect('/');
});

export default adminRouter;