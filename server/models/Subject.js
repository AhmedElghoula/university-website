const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, "Please provide a code"], // Clearer error message
        },
        name: {
            type: String,
            required: [true, "Please provide a name"], // Clearer error message
        },
        hc: {
            type: Number,
        },
        htd: {
            type: Number,
        },
        htp: {
            type: Number,
        },
        semester: {
            type: Number,
        },
        coefficient: {
            type: Number,
        },
        formation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Formation", // Referencing the 'Author' model
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
