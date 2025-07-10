const express = require("express");
const router = express.Router();

const {
    createFormation,
    getAllFormation,
    getAllFormationWithGroups,
    getOneFormationWithGroups,
    getFormationWithSubjects,
    updateFormation,
    deleteFormation,
} = require("../controllers/formationController");

router.post("/create", createFormation);

router.get("/all/formations", getAllFormation);
router.get("/formation/with/groups", getAllFormationWithGroups);
router.get("/one/formation/with/groups/:id", getOneFormationWithGroups);
router.get("/formation/with/subjects/:id", getFormationWithSubjects);
router.get("/formation/with/subjects", getFormationWithSubjects);

router.patch("/update/formation/:id", updateFormation);
router.delete("/delete/formation/:id", deleteFormation);

module.exports = router;
