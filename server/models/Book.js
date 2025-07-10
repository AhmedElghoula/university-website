const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a name"], // Clearer error message
            minlength: 3,
            maxlength: 50,
        },
        description: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        author: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        borrowed: {
            type: Boolean,
            required: [true, "Please provide a description"], // Clearer error message
            default: false,
        },
        image: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
            default: false,
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Book", BookSchema);