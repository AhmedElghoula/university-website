const mongoose = require("mongoose");

const TimeTableSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("TimeTable", TimeTableSchema);
