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
}
