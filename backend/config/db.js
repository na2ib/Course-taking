import mysql from "mysql";
import { config } from "dotenv";

config();

let db;

function handleDisconnect() {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    db.connect((err) => {
        if (err) {
            console.log("Error when connecting to db:", err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log("Db Connected Successfully");
        }
    });
    db.on("error", (err) => {
        console.log("Database error", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("Connection lost. Reconnecting...");
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();

export default db;
