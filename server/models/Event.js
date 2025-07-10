const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {

        description: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        date: {
            type: Date,
            required: [true, "Please provide a description"], // Clearer error message
        },
        rank: {
            type: Number,
            required: [true, "Please provide a description"], // Clearer error message
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Calendar",
        },
    
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Event", EventSchema);
