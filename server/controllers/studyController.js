const User = require("../models/User");
const Formation = require("../models/Formation");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const getTeacherCourses = async (req, res) => {
    const { userId } = req.user; // Extracting the id from the request parameters

    // First, find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Get the formation IDs from the user's classesToTeach
    const formationIds = user.classesToTeach.formations;

    // Use aggregation pipeline to fetch formations with subjects and courses
    const pipeline = [
        // Match formations based on IDs from the user's classesToTeach
        {
            $match: {
                _id: { $in: formationIds },
            },
        },
        // Lookup subjects that belong to these formations
        {
            $lookup: {
                from: "subjects",
                localField: "_id",
                foreignField: "formation",
                as: "subjects",
            },
        },
        // Unwind the subjects array to perform operations on each subject
        { $unwind: "$subjects" },
        // Lookup courses for each subject
        {
            $lookup: {
                from: "courses",
                localField: "subjects._id",
                foreignField: "subject",
                as: "subjects.courses",
            },
        },
        // Group by formation and nest subjects inside each formation
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                subjects: { $push: "$subjects" },
            },
        },
    ];

    // Execute the aggregation pipeline
    const result = await Formation.aggregate(pipeline);

    // const userData = await User.aggregate([
    //     { $match: { _id: mongoose.Types.ObjectId(userId) } },
    //     {
    //         $lookup: {
    //             from: "formations",
    //             localField: "classesToTeach.formations",
    //             foreignField: "_id",
    //             as: "formations",
    //         },
    //     },
    //     { $unwind: "$formations" },
    //     {
    //         $lookup: {
    //             from: "subjects",
    //             localField: "classesToTeach.formations",
    //             foreignField: "formation",
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             $and: [{ $in: ["$_id", "$$formationIds"] }],
    //                         },
    //                     },
    //                 },
    //             ],
    //             as: "formations.subjects",
    //         },
    //     },
    //     { $unwind: "$formations.subjects" },
    //     {
    //         $lookup: {
    //             from: "courses",
    //             localField: "formations.subjects._id",
    //             foreignField: "subject",
    //             as: "formations.subjects.courses",
    //         },
    //     },
    //     {
    //         $group: {
    //             _id: {
    //                 _id: "$_id",
    //                 cin: "$cin",
    //                 role: "$role",
    //                 name: "$name",
    //                 secondName: "$secondName",
    //                 status: "$status",
    //                 address: "$address",
    //                 birthDate: "$birthDate",
    //                 email: "$email",
    //                 password: "$password",
    //                 phoneNumber: "$phoneNumber",
    //                 postalCode: "$postalCode",
    //                 profilePhoto: "$profilePhoto",
    //                 sexe: "$sexe",
    //                 formationId: "$formations._id",
    //                 formationName: "$formations.name",
    //                 formationCode: "$formations.code",
    //                 formationType: "$formations.type",
    //                 formationNumberOfGroups: "$formations.numberOfGroups",
    //                 formationCreatedAt: "$formations.createdAt",
    //                 formationUpdatedAt: "$formations.updatedAt",
    //                 formation__v: "$formations.__v",
    //             },
    //             subjects: { $push: "$formations.subjects" },
    //         },
    //     },
    //     {
    //         $group: {
    //             _id: "$_id._id",
    //             cin: { $first: "$_id.cin" },
    //             role: { $first: "$_id.role" },
    //             name: { $first: "$_id.name" },
    //             secondName: { $first: "$_id.secondName" },
    //             status: { $first: "$_id.status" },
    //             address: { $first: "$_id.address" },
    //             birthDate: { $first: "$_id.birthDate" },
    //             email: { $first: "$_id.email" },
    //             password: { $first: "$_id.password" },
    //             phoneNumber: { $first: "$_id.phoneNumber" },
    //             postalCode: { $first: "$_id.postalCode" },
    //             profilePhoto: { $first: "$_id.profilePhoto" },
    //             sexe: { $first: "$_id.sexe" },
    //             formations: {
    //                 $push: {
    //                     _id: "$_id.formationId",
    //                     name: "$_id.formationName",
    //                     code: "$_id.formationCode",
    //                     type: "$_id.formationType",
    //                     numberOfGroups: "$_id.formationNumberOfGroups",
    //                     createdAt: "$_id.formationCreatedAt",
    //                     updatedAt: "$_id.formationUpdatedAt",
    //                     __v: "$_id.formation__v",
    //                     subjects: "$subjects",
    //                 },
    //             },
    //         },
    //     },
    // ]);

    // const userData = await User.aggregate([
    //     { $match: { _id: mongoose.Types.ObjectId(userId) } },
    //     {
    //         $lookup: {
    //             from: "formations",
    //             localField: "classesToTeach.formations",
    //             foreignField: "_id",
    //             as: "formations",
    //         },
    //     },
    //     { $unwind: "$formations" },
    //     {
    //         $lookup: {
    //             from: "subjects",
    //             let: { formationIds: "$classesToTeach.subjects" },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             $and: [{ $in: ["$_id", "$$formationIds"] }],
    //                         },
    //                     },
    //                 },
    //             ],
    //             as: "formations.subjects",
    //         },
    //     },
    //     { $unwind: "$formations.subjects" },
    //     {
    //         $lookup: {
    //             from: "courses",
    //             localField: "formations.subjects._id",
    //             foreignField: "subject",
    //             as: "formations.subjects.courses",
    //         },
    //     },
    //     {
    //         $group: {
    //             _id: {
    //                 _id: "$_id",
    //                 cin: "$cin",
    //                 role: "$role",
    //                 name: "$name",
    //                 secondName: "$secondName",
    //                 status: "$status",
    //                 address: "$address",
    //                 birthDate: "$birthDate",
    //                 email: "$email",
    //                 password: "$password",
    //                 phoneNumber: "$phoneNumber",
    //                 postalCode: "$postalCode",
    //                 profilePhoto: "$profilePhoto",
    //                 sexe: "$sexe",
    //                 formationId: "$formations._id",
    //                 formationName: "$formations.name",
    //                 formationCode: "$formations.code",
    //                 formationType: "$formations.type",
    //                 formationNumberOfGroups: "$formations.numberOfGroups",
    //                 formationCreatedAt: "$formations.createdAt",
    //                 formationUpdatedAt: "$formations.updatedAt",
    //                 formation__v: "$formations.__v",
    //             },
    //             subjects: { $push: "$formations.subjects" },
    //         },
    //     },
    //     {
    //         $group: {
    //             _id: "$_id._id",
    //             cin: { $first: "$_id.cin" },
    //             role: { $first: "$_id.role" },
    //             name: { $first: "$_id.name" },
    //             secondName: { $first: "$_id.secondName" },
    //             status: { $first: "$_id.status" },
    //             address: { $first: "$_id.address" },
    //             birthDate: { $first: "$_id.birthDate" },
    //             email: { $first: "$_id.email" },
    //             password: { $first: "$_id.password" },
    //             phoneNumber: { $first: "$_id.phoneNumber" },
    //             postalCode: { $first: "$_id.postalCode" },
    //             profilePhoto: { $first: "$_id.profilePhoto" },
    //             sexe: { $first: "$_id.sexe" },
    //             formations: {
    //                 $push: {
    //                     _id: "$_id.formationId",
    //                     name: "$_id.formationName",
    //                     code: "$_id.formationCode",
    //                     type: "$_id.formationType",
    //                     numberOfGroups: "$_id.formationNumberOfGroups",
    //                     createdAt: "$_id.formationCreatedAt",
    //                     updatedAt: "$_id.formationUpdatedAt",
    //                     __v: "$_id.formation__v",
    //                     subjects: "$subjects",
    //                 },
    //             },
    //         },
    //     },
    // ]);

    res.status(StatusCodes.OK).json({ result });
};

module.exports = {
    getTeacherCourses,
};
