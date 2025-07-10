const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");
const bcrypt = require("bcryptjs");

const registerSecondStep = async (req, res) => {
    const {
        email,
        password,
        sexe,
        phoneNumber,
        birthDate,
        profilePhoto,
        address,
        postalCode,
        cin,
    } = req.body;

    let payload;

    if (!profilePhoto) {
        payload = {
            email,
            password,
            sexe,
            phoneNumber,
            birthDate,
            address,
            postalCode,
            cin,
        };
    } else {
        payload = {
            email,
            password,
            sexe,
            phoneNumber,
            birthDate,
            address,
            postalCode,
            profilePhoto,
            cin,
        };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    payload.password = hashedpassword;

    const updatedAccount = await User.findOneAndUpdate(
        { cin: cin },
        { $set: payload }, // Use $set to update only the fields provided in req.body
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(StatusCodes.CREATED).json({ msg: "register was successful" });

    // first registered user is an admin
};

const registerFirstStep = async (req, res) => {
    const { cin } = req.params;
    const { email } = req.body;

    const emailAlreadyExists = await User.findOne({ email: email });
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError("Account already created");
    }

    const userExists = await User.findOne({ cin: cin }).select("name secondName");
    if (!userExists) {
        throw new CustomError.BadRequestError("User withCIN doesn't exist");
    }

    res.status(StatusCodes.OK).json({ user: userExists });

    // first registered user is an admin
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
    registerFirstStep,
    registerSecondStep,
    login,
    logout,
};
