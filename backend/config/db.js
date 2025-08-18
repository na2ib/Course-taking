import mysql from 'mysql';
import { config } from "dotenv";

config(); // This loads your .env file for local development

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.log("Db connection error");
        return;
    }
    console.log("Db Connected Successfully");
});

export default db;
