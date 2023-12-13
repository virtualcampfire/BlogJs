import express from "express";
import SessionJs from "sessionjs";

const adminRouter = express.Router();
let session = new SessionJs();

let admin = {
    username: "admin",
    password: "admin"
};

// Temp Start User
session.start(admin);

adminRouter.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let sessions = session.getAll();

    let thisSession = sessions.find((singleSession) => {
        return singleSession.user.username == username && singleSession.user.password == password;
    });

    if(thisSession){
        session.renew(thisSession.sessionId);
        return res.json({
            status: 'ok',
            data: thisSession.sessionId
        });
    }
    else{
        res.redirect('/admin');
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

adminRouter.get("/admin", (req, res) => {
    res.render('./admin/adminView');
});

adminRouter.get("/settings", (req, res) => {
    res.render('./admin/settingsView', );
});

adminRouter.post("/updateUser", (req, res) => {
    let newUsername = req.body.newUsername;
    let password = req.body.password;
    let thisSession = req.thisSession;
    let sessionId = session.getSessionId(thisSession);

    console.log(thisSession);

    newUsername ? newUsername : newUsername = thisSession.user.username;

    let newUser = {
        username: newUsername,
        password: password
    };

    console.log(sessionId);

    let check = session.updateUser(sessionId, newUser);
    console.log(check)
    console.log(session.getAll());

    res.json({
        status: 'ok',
        data: admin
    });
});

export default adminRouter;