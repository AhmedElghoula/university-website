const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title"], // Clearer error message
        },
        description: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        content: {
            type: String,
            required: [true, "Please provide content"], // Clearer error message
        },
        new: {
            type: Boolean,
           // default value true
           default:true
        }
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("News", NewsSchema);
