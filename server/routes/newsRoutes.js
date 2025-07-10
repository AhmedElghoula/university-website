const express = require("express");
const router = express.Router();

const {
    createNews,
    getAllNewsCards,
    getFullNews,
    updateNews,
    deleteNews,
} = require("../controllers/newsController");

router.post("/create", createNews);
router.get("/all/news/cards", getAllNewsCards);
router.get("/full/news/:id", getFullNews);
router.patch("/update/news/:id", updateNews);
router.delete("/delete/news/:id", deleteNews);

module.exports = router;
