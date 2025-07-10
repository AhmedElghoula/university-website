const Subject = require("../models/Subject");
const { StatusCodes } = require("http-status-codes");
const transformNumberToString = require("../utils/codeFormatter");

const createSubject = async (req, res) => {
    const subjects = await Subject.find({}).sort({ code: -1 }).limit(1).select("code");

    let newCode = 1;
    if (subjects.length !== 0) {
        let { code } = subjects[0];
        // Remove '#' from the beginning of the code
        if (code.charAt(0) === "#") {
            code = code.slice(1);
        }
        // Convert the code to a number
        newCode = parseInt(code, 10) + 1;
    }
    req.body.code = transformNumberToString(newCode);
    let subject = await Subject.create(req.body);
    res.status(StatusCodes.CREATED).json({ subject });
};

const getAllSubjects = async (req, res) => {
    let allSubjects = await Subject.find({});
    // Respond with updated allSubjects array
    res.status(StatusCodes.OK).json({ allSubjects });
};

const updateSubject = async (req, res) => {
    const { id } = req.params;

    // Find the news item by ID and update it
    const updatedSubject = await Subject.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedSubject) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Subject not found" });
    }

    res.status(StatusCodes.OK).json({ updatedSubject });
};

const deleteSubject = async (req, res) => {
    const { id } = req.params;

    // Find the news item by ID and delete it
    const deletedSubject = await Subject.findOneAndDelete({ _id: id });

    if (!deletedSubject) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Subject not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Subject deleted successfully" });
};

module.exports = {
    createSubject,
    getAllSubjects,
    updateSubject,
    deleteSubject,
};
