const express = require("express");
const router = express.Router();

const {
    createOffer,
    getAllOfferCards,
    getFullOffer,
    updateOffer,
    deleteOffer,
} = require("../controllers/offerController");

router.post("/create", createOffer);
router.get("/all/offer/cards", getAllOfferCards);
router.get("/full/offer/:id", getFullOffer);
router.patch("/update/offer/:id", updateOffer);
router.delete("/delete/offer/:id", deleteOffer);

module.exports = router;
