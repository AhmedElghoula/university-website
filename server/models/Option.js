const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema(
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
        formation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Formation", // Referencing the 'Author' model
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Option", OptionSchema);
