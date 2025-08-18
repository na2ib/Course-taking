import express from "express";
import cors from 'cors'
import { config } from "dotenv";
import db from './config/db.js'
import studenRoute from './routes/studentsRoute.js'
import teacherRoute from './routes/teacherRoute.js'

config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173'
}))



app.use('/api', studenRoute)
app.use('/api', teacherRoute)

const port = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.send('Hello ji server')
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});