const mongoose = require("mongoose");

const AttachmentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        news: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "News", // Referencing the 'Author' model
        },
        administrativeDocument: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Formation", // Referencing the 'Author' model
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AdministrativeDocument", AttachmentSchema);
