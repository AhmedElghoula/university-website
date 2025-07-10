const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"], // Clearer error message
            minlength: 3,
            maxlength: 50,
        },
        description: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        deadline: {
            type: Date,
            required: [true, "Please provide a description"], // Clearer error message
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        to: {
            type: String,
            enum: ["MALE", "FEMALE"],
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Assignment", AssignmentSchema);
