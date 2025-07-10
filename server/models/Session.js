const mongoose = require("mongoose");

const TimeTableSchema = new mongoose.Schema(
    {
        day: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
            enum: ["MON"],
        },
        class: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
            enum: ["MON"],
        },
        begin: {
            type: Date,
            required: [true, "Please provide a description"], // Clearer error message
        },
        end: {
            type: Date,
            required: [true, "Please provide a description"], // Clearer error message
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("TimeTable", TimeTableSchema);
