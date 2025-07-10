const mongoose = require("mongoose");

const FormationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        code: {
            type: String,
        },
        type: {
            type: String,
            enum: ["LISENCE", "MASTERE", "INGENIEUR", "PREPARATOIRE"],
        },
        // department: {
        //     type: String,
        //     required: [true, "Please provide a name"], // Clearer error message
        //     enum: ["MALE", "FEMALE"],
        // },
        //filiere = class

        numberOfGroups: {
            type: Number,
            required: [true, "Please provide a description"], // Clearer error message
        },
    },
    /**
     * when fetching formations , we multpy by number of groups
     */
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Formation", FormationSchema);
