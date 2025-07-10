const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        description: {
            type: String,
            required: [true, "Please provide a description"], // Clearer error message
        },
        /**
         * when the user has the role of admin, the from becomes in the front end adminstration
         */
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Referencing the 'Author' model
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Referencing the 'Author' model
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Notification", NotificationSchema);
