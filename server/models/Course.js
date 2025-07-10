const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        file: {
            type: String,
            required: [true, "Please provide a file"], // Clearer error message
        },
        name: {
            type: String,
            required: [true, "Please provide a name"], // Clearer error message
},
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject   ", // Referencing the 'Author' model
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
