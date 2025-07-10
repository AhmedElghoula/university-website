const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        
            minlength: 3,
            maxlength: 50,
        },
        compnayName: {
            type: String,
            
        },
        companyEmail: {
            type: String,
           
        },
        position: {
            type: String,
            
        },
        description: {
            type: String,
            
        },
        deadline: {
            type: Date,
        
        },
    },
    { timestamps: true }
); // Timestamps option placed correctly

module.exports = mongoose.model("Assignment", AssignmentSchema);
