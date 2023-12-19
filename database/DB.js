import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

export default class DB {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    connect() {
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL!');
        });
    }

    getBlogs() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM posts", (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    getBlog(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM posts WHERE id = ${id}`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    createBlog(blog) {
        const { title, category, example, image, creator, date, text } = blog;
        return new Promise((resolve, reject) => {
            this.connection.query(`INSERT INTO posts (title, category, example, image, creator, date, text) VALUES ('${title}', '${category}', '${example}', '${image}', '${creator}', '${date}', '${text}')`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    updateBlog(blog) {
        const { id, title, category, example, image, creator, date, text } = blog;
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE posts SET title = '${title}', category = '${category}', example = '${example}', image = '${image}', creator = '${creator}', date = '${date}', text = '${text}' WHERE id = ${id}`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    deleteBlog(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(`DELETE FROM posts WHERE id = ${id}`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}
