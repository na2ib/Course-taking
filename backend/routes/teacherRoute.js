import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/add-course", (req, res) => {
    const { courseName, courseCode, courseDetail } = req.body;
    console.log("CourseName Code :", courseName, courseCode, courseDetail);

    if (!courseName || !courseCode || !courseDetail) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }

    const sql = "INSERT INTO course (cname, ccode, cdetails) VALUES (?, ?, ?)";
    db.query(sql, [courseName, courseCode, courseDetail], (err, result) => {
        if (err) {
            console.error("Error adding course:", err);
            return res
                .status(500)
                .json({ success: false, message: "Error adding course" });
        }

        return res
            .status(201)
            .json({ success: true, message: "Course added successfully!" });
    });
});

export default router;
