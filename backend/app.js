import express from "express";
import cors from 'cors';
import { config } from "dotenv";
import db from './config/db.js';
import studenRoute from './routes/studentsRoute.js';
import teacherRoute from './routes/teacherRoute.js';

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// VITAL CHANGE HERE: Allow requests from any origin, not just localhost.
app.use(cors());

app.use('/api', studenRoute);
app.use('/api', teacherRoute);

app.get('/', (req, res) => {
    res.send('Hello ji server');
});

// We only need to define the PORT once, right before we use it.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});