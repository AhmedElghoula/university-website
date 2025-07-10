const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Define the schema for the ObjectId
const ObjectIdSchema = mongoose.Schema.Types.ObjectId;

const ClassesToTeach = new mongoose.Schema({
    formations: [
        {
            type: ObjectIdSchema,
            ref: "Formation",
        },
    ],
    groups: [
        {
            type: String,
        },
    ],
    subjects: [
        {
            type: ObjectIdSchema,
            ref: "Subject", // Assuming "Formation" is the referenced model
        },
    ],
});

const UserSchema = new mongoose.Schema({
    cin: {
        type: Number,
        unique: true,
        validate: {
            validator: function (value) {
                return /^\d{8}$/.test(value.toString()); // Test if it's an 8-digit number
            },
            message: "CIN must be an 8-digit number",
        },
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        minlength: 6,
    },
    role: {
        type: String,
        enum: [
            "superAdmin",
            "respPlanAcad",
            "respNote",
            "respDocAdmins",
            "respActu",
            "respBib",
            "respOffreStage",
            "enseignant",
            "etudiant",
        ],
        default: "sansRole",
    },
    //personal info
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
    },
    secondName: {
        type: String,
        minlength: 3,
        maxlength: 50,
    },
    sexe: {
        type: String,
        enum: ["MALE", "FEMALE"],
    },
    phoneNumber: {
        type: Number,
    },
    birthDate: {
        type: Date,
    },
    profilePhoto: {
        type: String,
    },
    address: {
        type: String,
    },
    postalCode: {
        type: Number,
    },
    //student attributes
    class: {
        type: String,
    }, // hedhi code formation
    //teacher attributes
    classesToTeach: ClassesToTeach,
    status: {
        type: Boolean,
        default: false,
    },
});

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
