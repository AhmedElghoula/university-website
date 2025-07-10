const Course = require("../models/Course");
const { StatusCodes } = require("http-status-codes");

const createCourse = async (req, res) => {
    console.log('////////',req.body);
    const news = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json({ news });
};

const getSubjectCourses = async (req, res) => {
    const allNewsCards = await Course.find({ subject: subject });
    res.status(StatusCodes.OK).json({ allNewsCards });
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    // Find the news item by ID and delete it
    const deletedCourse = await Course.findOneAndDelete({ _id: id });

    if (!deletedCourse) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "News not found" });
    }

    res.status(StatusCodes.OK).json({ deletedCourse });
};

module.exports = {
    createCourse,
    getSubjectCourses,
    deleteCourse,
};
