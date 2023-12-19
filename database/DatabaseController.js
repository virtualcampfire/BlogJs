import DB from './DB.js';
import Migration from './Migration.js';

export default class DatabaseController{
    constructor(){
        this.db = new DB();
        this.db.connect();
    }
    migrate(){
        const migration = new Migration();
        this.db.connection.query(migration.user(), (err, result) => {
            if (err) throw err;
            console.log("User table created");
        });
        this.db.connection.query(migration.posts(), (err, result) => {
            if (err) throw err;
            console.log("Posts table created");
        });
    }
    getBlogs(){
        return new Promise((resolve, reject) => {
            this.db.connection.query("SELECT * FROM posts", (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}