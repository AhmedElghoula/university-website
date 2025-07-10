const mongoose = require("mongoose");

const LineBorrowSchema = new mongoose.Schema(
    {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book", // Referencing the 'Author' model
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Referencing the 'Author' model
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("LineBorrow", LineBorrowSchema);
