import express from "express";
import DatabaseController from "../database/DatabaseController.js";

const homeRoutes = express.Router();

const dbc = new DatabaseController();

homeRoutes.get("/", (req, res) => {
    res.render('./home/homeView');
});

homeRoutes.get("/about", (req, res) => {
    res.render('./admin/aboutView');
});

homeRoutes.get("/blog", async (req, res) => {
    const blogs = await dbc.getBlogs();
    res.render('./blog/blogView', { blogPosts: blogs });
});

homeRoutes.get("/blog/:id", async (req, res) => {
    const id = req.params.id;
    const post = await dbc.getBlog(id);
    res.render('./blog/singlePostView', { blogPost: post[0] });
});

export default homeRoutes;