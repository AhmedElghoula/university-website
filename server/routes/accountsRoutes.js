const express = require("express");
const router = express.Router();

const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

const {
    createAccount,
    getAllAccounts,
    updateAccount,
    deleteAccount,
    getAllRoles,
    getByRole,
    addClassesToTeach,
    affectToClass,
    getProfileData,
    enableDisableAccount,
} = require("../controllers/accountsController");

router.post("/create", authenticateUser, authorizePermissions("superAdmin"), createAccount);
router.get("/all/accounts", authenticateUser, authorizePermissions("superAdmin"), getAllAccounts);
router.get("/by/role", authenticateUser, authorizePermissions("superAdmin"), getByRole);
router.get("/all/roles", authenticateUser, authorizePermissions("superAdmin"), getAllRoles);
router.get(
    "/profile/data/:cin",
    authenticateUser,
    authorizePermissions("superAdmin"),
    getProfileData
);

router.patch(
    "/update/account/:cin",
    authenticateUser,
    authorizePermissions("superAdmin"),
    updateAccount
);
router.patch(
    "/update/account/:cin",
    authenticateUser,
    authorizePermissions("superAdmin"),
    updateAccount
);

router.patch(
    "/add/classes/to/teach/:cin",
    authenticateUser,
    authorizePermissions("superAdmin"),
    addClassesToTeach
);
router.patch(
    "/affect/student/to/class/:cin",
    authenticateUser,
    authorizePermissions("superAdmin"),
    affectToClass
);
router.patch(
    "/switch/status/:cin",
    authenticateUser,
    authorizePermissions("superAdmin"),
    enableDisableAccount
);

router.delete(
    "/delete/account/:cin",
    authenticateUser,
    authorizePermissions("superAdmin"),
    deleteAccount
);

module.exports = router;
