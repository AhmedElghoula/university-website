const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        from: {
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

module.exports = mongoose.model("Comment", CommentSchema);
