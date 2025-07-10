const User = require("../models/User");
const Formation = require("../models/Formation");
const { StatusCodes } = require("http-status-codes");

/**  */
const createAccount = async (req, res) => {
    // cin , nom, prenom role
    const account = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ account });
};

/** */
const getAllAccounts = async (req, res) => {
    const allAccounts = await User.find({ role: { $ne: "superAdmin" } });
    res.status(StatusCodes.OK).json({ allAccounts });
};

const getProfileData = async (req, res) => {
    const { cin } = req.params;

    role = await User.findOne({ cin: cin }).select("role");

    let accountData;

    if (role === "enseignant") {
        accountData = await User.findOne({ cin: cin }).select("-password -class");
        // add classes to teach
    } else if (role === "etudiant") {
        accountData = await User.findOne({ cin: cin }).select("-classesToTeach   -password");
    } else {
        accountData = await User.findOne({ cin: cin }).select(
            " -class -group -classesToTeach -password"
        );
    }

    res.status(StatusCodes.OK).json({ account: accountData });
};

const updateAccount = async (req, res) => {
    const { cin } = req.params;

    // Find the news item by ID and update it
    const updatedAccount = await User.findOneAndUpdate(
        { cin: cin },
        { $set: req.body }, // Use $set to update only the fields provided in req.body
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedAccount) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "account not found" });
    }

    res.status(StatusCodes.OK).json({ updatedAccount });
};

/** */
const deleteAccount = async (req, res) => {
    const { cin } = req.params;

    // Find the news item by ID and delete it
    const deletedAccount = await User.findOneAndDelete({ cin: cin });

    if (!deleteAccount) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Account not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Account deleted successfully" });
};
/** */
const getAllRoles = async (req, res) => {
    res.status(StatusCodes.OK).json({
        roles: [
            "superAdmin",
            "respPlanAcad",
            "respNote",
            "respDocAdmins",
            "respActu",
            "respBib",
            "respOffreStage",
            "enseignant",
            "etudiant",
        ],
    });
};

/** */
const getByRole = async (req, res) => {
    const { role } = req.body;
    const filteredAccounts = await User.find({ role: role });
    res.status(StatusCodes.OK).json({ filteredAccounts });
};

/** */
const affectToClass = async (req, res) => {
    /**
     * call getFormationWithClasses
     * affect it to one clss
     */
    const { cin } = req.params;
    const { class: updatedClass } = req.body;

    // Check if either class or group is provided in the request body
    if (!updatedClass) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Class or group must be provided for update." });
    }

    const updateFields = {};
    if (updatedClass) {
        updateFields.class = updatedClass;
    }

    const student = await User.findOneAndUpdate(
        { cin: cin },
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    if (!student) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Student not found." });
    }

    res.status(StatusCodes.CREATED).json({ msg: "Update successful", student });
};

const addClassesToTeach = async (req, res) => {
    const { cin } = req.params;
    const { formations, groups, subjects } = req.body.classesToTeach;

    if (!cin || !Array.isArray(formations) || !Array.isArray(groups) || !Array.isArray(subjects)) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Invalid request. Please provide arrays for each value ." });
    }

    // Assuming "Formation" is the model representing classes to teach
    const updatedTeacher = await User.findOneAndUpdate(
        { cin: cin },
        { $set: { classesToTeach: req.body.classesToTeach } },
        { new: true }
    );

    res.status(StatusCodes.CREATED).json({
        msg: "Classes added to teach successfully",
        teacher: updatedTeacher,
    });
};

const enableDisableAccount = async (req, res) => {
    const { cin } = req.params;

    // Find the user account by cin
    const user = await User.findOne({ cin: cin });

    // If user account not found, return error
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Account not found" });
    }

    // Toggle the status attribute
    user.status = !user.status;

    // Save the updated user account
    await user.save();

    res.status(StatusCodes.OK).json({ updatedAccount: user });
};

module.exports = {
    createAccount,
    getAllAccounts,
    updateAccount,
    deleteAccount,
    getAllRoles,
    getByRole,
    affectToClass,
    addClassesToTeach,
    getProfileData,
    enableDisableAccount,
    getByRole,
};
