import express from 'express'
import db from '../config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { auth } from '../middlewares/auth.js'

const router = express.Router()


router.post('/signup', async (req, res) => {
    const { name, student_id, department, email, password, phoneNumber } = req.body
    console.log(req.body)

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);


    const checkSql = 'SELECT * FROM student WHERE email = ? OR sid = ?';
    db.query(checkSql, [email, student_id], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error checking for existing student' });
        }

        if (result.length > 0) {
            return res.status(400).json({ success: false, message: 'Email or Student ID already exists' });
        }

        const sql = `INSERT INTO student (name, sid, department, email, password, phone) 
        VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql, [name, student_id, department, email, hashedPassword, phoneNumber], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error signing up the student' });
            }

            return res.status(201).json({ success: true, message: 'Student signed up successfully!' });
        })
    })


})


router.post('/signin', (req, res) => {

    const { email, password } = req.body

    const checkSql = 'SELECT * FROM student WHERE email = ?';
    db.query(checkSql, [email], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error checking for existing student' });
        }

        if (result.length === 0) {
            return res.status(400).json({ success: false, message: 'Student Not Found' });
        }

        const user = result[0]
        // console.log(user.email);

        const matchPass = await bcrypt.compare(password, user.password)
        console.log('password: ', matchPass);

        if (!matchPass) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

        const authToken = jwt.sign({ id: user.sid, name: user.name, email: user.email, department: user.department, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.json({ token: authToken, success: true, message: 'SignedIn Successfully' })

    })



})

router.post('/profile/update', auth, async (req, res) => {
    try {
        const { id, name, phone, oldid } = req.body; 

        console.log('Updated :', oldid, id);

        
        if (!id || !name || !phone) {
            return res.status(400).json({ message: 'Please provide student ID, name, and phone.' });
        }

        

        const updateSql = 'UPDATE student SET name = ?, sid = ?, phone = ? WHERE sid = ?'
        db.query(updateSql, [name, id, phone, oldid], (error, result) => {
            if (error) {
                return res.status(404).json({ message: 'Student not found' });
            } else {
                return res.status(200).json({ message: 'Profile updated successfully' });
            }

        })


    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/courses', auth, (req, res) => {
    const sql = 'SELECT * FROM course'
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ message: 'Error getting students' })
        }
        return res.json(data)
    })
})



router.post('/submit-course', auth, (req, res) => {
    const { selectedCourse } = req.body;
    const student_id = req.user.id;

    if (!selectedCourse) {
        return res.status(400).json({ success: false, message: 'Course is required' });
    }


    const studentCheckSql = 'SELECT * FROM student_take_course WHERE sid = ?';
    db.query(studentCheckSql, [student_id], (studentErr, studentRows) => {
        if (studentErr) {
            console.error(studentErr);
            return res.status(500).json({ success: false, message: 'Error checking student' });
        }

        if (studentRows.length > 0) {
            return res.status(400).json({ success: false, message: 'You can not take more courses' });
        }


        const insertSql = 'INSERT INTO student_take_course (sid, ccode) VALUES (?, ?)';
        db.query(insertSql, [student_id, selectedCourse], (insertErr, insertResult) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({ success: false, message: 'Error adding course' });
            }

            return res.status(201).json({ success: true, message: 'Course added successfully!' });
        });
    });
});

router.delete('/drop-course', auth, (req, res) => {
    const { selectedCourse } = req.body
    // console.log(selectedCourse);
    const student_id = req.user.id

    if (!selectedCourse) {
        return res.status(400).json({ success: false, message: 'Course is required' });
    }

    const enrollmentCheckSql = 'SELECT * FROM student_take_course WHERE sid = ? AND ccode = ?';
    db.query(enrollmentCheckSql, [student_id, selectedCourse], (enrollmentErr, enrollmentRows) => {
        if (enrollmentErr) {
            console.error('Error checking enrollment:', enrollmentErr);
            return res.status(500).json({ success: false, message: 'Error checking enrollment' });
        }

        if (enrollmentRows.length === 0) {
            console.error('Student is not enrolled in this course');
            return res.status(400).json({ success: false, message: 'You are not enrolled in this course' });
        }

        const deleteSql = 'DELETE FROM student_take_course WHERE sid = ? AND ccode = ?';
        db.query(deleteSql, [student_id, selectedCourse], (deleteErr, deleteResult) => {
            if (deleteErr) {
                console.error('Error deleting course:', deleteErr);
                return res.status(500).json({ success: false, message: 'Error deleting course' });
            }

            return res.status(200).json({ success: true, message: 'Course dropped successfully!' });
        });


    })
});


router.get('/current-course', auth, (req, res) => {

    const student_id = req.user.id

    const sql = 'SELECT * FROM student_take_course WHERE sid = ?'
    db.query(sql, [student_id], (err, data) => {
        if (err) {
            return res.json({ message: 'Error getting students' })
        }
        return res.json(data)
    })
})

router.post('/current-course-details', (req, res) => {
    const { courseCode } = req.body
    console.log(courseCode);

    const sql = 'SELECT * FROM course WHERE ccode = ?'
    db.query(sql, [courseCode], (err, data) => {
        if (err) {
            return res.json({ message: 'Error getting course' })
        }
        // console.log(data);
        return res.json(data[0])
    })
})





router.get('/students', (req, res) => {
    const sql = 'SELECT * FROM student'
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ message: 'Error getting students' })
        }
        return res.json(data)
    })
})

router.get('/profile', auth, (req, res) => {
    res.json({ user: req.user })
})

export default router