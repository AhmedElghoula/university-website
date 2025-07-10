const Offer = require("../models/Offer");
const { StatusCodes } = require("http-status-codes");

const createOffer = async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(StatusCodes.CREATED).json({ offer });
};

const getAllOfferCards = async (req, res) => {
  const allOfferCards = await Offer.find({});
  res.status(StatusCodes.OK).json({ allOfferCards });
};

const getFullOffer = async (req, res) => {
  const { id } = req.params; // Extracting the id from the request parameters
  const offerItem = await Offer.findById(id);

  if (!offerItem) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Offer not found" });
  }

  res.status(StatusCodes.OK).json({ offerItem });
};


const updateOffer = async (req, res) => {
  const { id } = req.params;


  const updatedOffer = await Offer.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedOffer) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Offer not found" });
  }

  res.status(StatusCodes.OK).json({ updatedOffer });
};

const deleteOffer = async (req, res) => {
  const { id } = req.params;

  const deletedOffer = await Offer.findOneAndDelete({ _id: id });

  if (!deletedOffer) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Offer not found" });
  }

  res.status(StatusCodes.OK).json({ message: "Offer deleted successfully" });
};

module.exports = {
  createOffer,
  getAllOfferCards,
  getFullOffer,
  updateOffer,
  deleteOffer,
};
