import mysql from 'mysql'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xyz'
})

db.connect((err) => {
    if (err) {
        console.log('Db connection error');
        return
    }
    console.log('Db Connected Successfully');
})

export default db