const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Referencing the 'Author' model
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject", // Referencing the 'Author' model
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Mark", MarkSchema);
