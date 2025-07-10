const express = require("express");
const router = express.Router();

const {
    createSubject,
    getAllSubjects,
    updateSubject,
    deleteSubject,
} = require("../controllers/subjectController");

router.post("/create", createSubject);
router.get("/all/subjects", getAllSubjects);
router.patch("/update/subject/:id", updateSubject);
router.delete("/delete/subject/:id", deleteSubject);

module.exports = router;
