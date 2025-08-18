import mysql from 'mysql';
import { config } from "dotenv";

config();

let db;

function handleDisconnect() {
    // Create the connection object
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    // Connect to the database
    db.connect((err) => {
        if (err) {
            console.log("Error when connecting to db:", err);
            setTimeout(handleDisconnect, 2000); // Try again after 2 seconds
        } else {
            console.log("Db Connected Successfully");
        }
    });

    // This is the crucial part: If the connection is lost, handle it
    db.on('error', (err) => {
        console.log('Database error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Connection lost. Reconnecting...');
            handleDisconnect(); // Reconnect
        } else {
            throw err; // For any other error, we still want to crash
        }
    });
}

// Start the connection process
handleDisconnect();

export default db;
