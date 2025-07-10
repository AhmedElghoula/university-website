const mongoose = require("mongoose");

const AdministrativeDocumentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"], // Clearer error message
        },
        description: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AdministrativeDocument", AdministrativeDocumentSchema);
