const express = require("express");
const router = express.Router();

const {
    registerFirstStep,
    registerSecondStep,
    login,
    logout,
} = require("../controllers/authController");

router.post("/register/first/step/:cin", registerFirstStep);
router.post("/register/second/step", registerSecondStep);

router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
