import express from "express";

const homeRoutes = express.Router();

homeRoutes.get("/", (req, res) => {
    res.render('./home/homeView');
});

homeRoutes.get("/about", (req, res) => {
    res.render('./admin/aboutView');
});

export default homeRoutes;