import DB from './DB.js';
import Migration from './Migration.js';

export default class DatabaseController {
    constructor() {
        this.db = new DB();
    }

    connect() {
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL!');
        });
    }

    async migrate() {
        const migration = new Migration();
        this.db.connection.query(migration.user(), (err, result) => {
            if (err) throw err;
            console.log("User table created");
        });
        this.db.connection.query(migration.posts(), (err, result) => {
            if (err) throw err;
            console.log("Posts table created");
        });
        const users = await this.getAllUsers();
        if (users.length == 0) {
            this.db.connection.query(migration.createAdmin(), (err, result) => {
                if (err) throw err;
                console.log("Admin created");
            });
        }
    }

    getBlogs() {
        return new Promise((resolve, reject) => {
            this.db.connection.query("SELECT * FROM posts", (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    getBlog(id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`SELECT * FROM posts WHERE id = ${id}`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    createBlog(blog) {
        const { title, category, example, image, creator, date, text } = blog;
        return new Promise((resolve, reject) => {
            this.db.connection.query(`INSERT INTO posts (title, category, example, image, creator, date, text) VALUES ('${title}', '${category}', '${example}', '${image}', '${creator}', '${date}', '${text}')`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    updateBlog(blog) {
        const { id, title, category, example, image, creator, text } = blog;
        const date = new Date();
        return new Promise((resolve, reject) => {
            this.db.connection.query(`UPDATE posts SET title = '${title}', category = '${category}', example = '${example}', image = '${image}', creator = '${creator}', date = '${date}', text = '${text}' WHERE id = ${id}`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    deleteBlog(id) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`DELETE FROM posts WHERE id = ${id}`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    getUser(username) {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    updateUser(user) {
        const { id, username, password } = user;
        return new Promise((resolve, reject) => {
            this.db.connection.query(`UPDATE users SET username = '${username}', password = '${password}' WHERE id = ${id}`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.db.connection.query(`SELECT * FROM users`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}