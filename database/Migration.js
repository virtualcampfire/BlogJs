// write a migration for mySQL database (User)

export default class Migration{
    user(){
        const sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255))";
        return sql;
    }
    posts(){
        const sql = "CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), category VARCHAR(255), example TEXT, image VARCHAR(255), creator VARCHAR(255), date DATE, text TEXT)";
        return sql;
    }
}