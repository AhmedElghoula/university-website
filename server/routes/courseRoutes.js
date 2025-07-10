const express = require("express");
const router = express.Router();

const {
    createCourse,
    getSubjectCourses,
    deleteCourse,
} = require("../controllers/courseController");

router.post("/create", createCourse);
router.get("/subject/courses", getSubjectCourses);
router.delete("/delete/course/:id", deleteCourse);

module.exports = router;
