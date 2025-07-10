const Formation = require("../models/Formation");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const createFormation = async (req, res) => {
    // payload
    // {
    //     "name" : "A1-Licence en Electro-Mécanique-Tronc Commun",
    //     "code": "LEM-A1",
    //     "type": "LISENCE",
    //     "numberOfGroups": "4"
    // }
    console.log(req.body)
    const formation = await Formation.create(req.body);
    res.status(StatusCodes.CREATED).json({ formation });
};

const getAllFormation = async (req, res) => {
    const allFormations = await Formation.find({});
    res.status(StatusCodes.OK).json({ allFormations });
};

const updateFormation = async (req, res) => {
    const { id } = req.params;

    // Find the news item by ID and update it
    const updatedFormation = await Formation.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedFormation) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Formation not found" });
    }

    res.status(StatusCodes.OK).json({ updatedFormation });
};

const deleteFormation = async (req, res) => {
    const { id } = req.params;

    // Find the news item by ID and delete it
    const deletedFormation = await Formation.findOneAndDelete({ _id: id });

    if (!deletedFormation) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Formation not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Formation deleted successfully" });
};

/** */
const getFormationWithSubjects = async (req, res) => {
     const ids  = req.query.ids.split(',');
     console.log('///////////',ids)
    // // Fetch the formation by its ID
    // const formationWithSubjects = await Formation.aggregate([
    //     {
    //         $match: { _id: mongoose.Types.ObjectId(id) },
    //     },
    //     {
    //         $lookup: {
    //             from: "subjects", // Name of the collection where subjects are stored
    //             localField: "_id",
    //             foreignField: "formation",
    //             as: "subjects",
    //         },
    //     },
    // ]);

    // if (!formationWithSubjects.length) {
    //     return res.status(404).json({ message: "Formation not found" });
    // }

    // res.status(StatusCodes.OK).json({ formationWithSubjects: formationWithSubjects[0] });

 
    // Convert array of IDs to array of ObjectId
    const formationIds = ids?.map((id) => mongoose.Types.ObjectId(id));

    // Fetch formations by their IDs and populate subjects
    const formationsWithSubjects = await Formation.aggregate([
        {
            $match: { _id: { $in: formationIds } },
        },
        {
            $lookup: {
                from: "subjects",
                localField: "_id",
                foreignField: "formation",
                as: "subjects",
            },
        },
    ]);

    // Check if any formations are found
    if (!formationsWithSubjects.length) {
        return res.status(404).json({ message: "Formations not found" });
    }

    let formattedFormations = [];

    for (const formationId of ids) {
        // Assume Formation model has a method findById to fetch formation by ID
        // Fetch formation from the database
        const formation = await Formation.findById(formationId);

        if (!formation) {
            // If formation is not found, skip to the next ID
            continue;
        }

        // Extract formation details
        const { code, numberOfGroups } = formation;

        // Generate formation codes based on the number of groups
        for (let i = 1; i <= numberOfGroups; i++) {
            // Format group number with leading zeros
            const formattedGroupNumber = i.toString().padStart(2, "0");
            // Add formatted formation code to the array
            formattedFormations.push(`${code}-${formattedGroupNumber}`);
        }
    }

    res.status(StatusCodes.OK).json({ formationsWithSubjects, formattedFormations });
};

/** */
const getAllFormationWithGroups = async (req, res) => {
    // Fetch all formations from the database
    const formations = await Formation.find();

    // Array to store formatted formation codes
    let formattedFormations = [];

    // Loop through each formation
    formations.forEach((formation) => {
        // Extract formation details
        const { code, numberOfGroups } = formation;

        // Generate formation codes based on the number of groups
        for (let i = 1; i <= numberOfGroups; i++) {
            // Format group number with leading zeros
            const formattedGroupNumber = i.toString().padStart(2, "0");
            // Add formatted formation code to the array
            formattedFormations.push(`${code}-${formattedGroupNumber}`);
        }
    });

    // Send the formatted formation codes as the response
    res.status(StatusCodes.OK).json({ formattedFormations });
};

const getOneFormationWithGroups = async (req, res) => {
    const { id } = req.params;
    // Fetch all formations from the database
    const formations = await Formation.find({ _id: id });

    // Array to store formatted formation codes
    let formattedFormations = [];

    // Loop through each formation
    formations.forEach((formation) => {
        // Extract formation details
        const { code, numberOfGroups } = formation;

        // Generate formation codes based on the number of groups
        for (let i = 1; i <= numberOfGroups; i++) {
            // Format group number with leading zeros
            const formattedGroupNumber = i.toString().padStart(2, "0");
            // Add formatted formation code to the array
            formattedFormations.push(`${code}-${formattedGroupNumber}`);
        }
    });

    // Send the formatted formation codes as the response
    res.status(StatusCodes.OK).json({ formattedFormations, msg: "one formation" });
};

/**
 * get formation with its subjects
 * to use for affecting
 */

module.exports = {
    createFormation,
    getAllFormation,
    updateFormation,
    deleteFormation,
    getOneFormationWithGroups,
    getAllFormationWithGroups,
    getFormationWithSubjects,
};
