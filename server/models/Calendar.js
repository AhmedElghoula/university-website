const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        type: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Calendar",
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Calendar", CalendarSchema);
