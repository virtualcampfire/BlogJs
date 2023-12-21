import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export default class Migration{
    user(){
        const sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255))";
        return sql;
    }
    createAdmin() {
        const saltRounds = 10;
        dotenv.config();
        const username = process.env.BLOG_USERNAME;
        const plainPassword = process.env.BLOG_PASSWORD;
        const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
        const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}')`;
        return sql;
    }
    posts(){
        const sql = "CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), category VARCHAR(255), example TEXT, image VARCHAR(255), creator VARCHAR(255), date DATE, text TEXT)";
        return sql;
    }
}