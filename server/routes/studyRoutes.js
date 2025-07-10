const express = require("express");
const router = express.Router();

const { getTeacherCourses } = require("../controllers/studyController");
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

router.get(
    "/teacher/courses",
    authenticateUser,
    authorizePermissions("enseignant"),
    getTeacherCourses
);

module.exports = router;
