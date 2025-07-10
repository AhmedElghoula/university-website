const express = require("express");
const router = express.Router();

const {
    createBook,
    getAllBook,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");

router.post("/create", createBook);
router.get("/all/books", getAllBook);
router.patch("/update/book/:id", updateBook);
router.delete("/delete/book/:id", deleteBook);

module.exports = router;
