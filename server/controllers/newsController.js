const News = require("../models/News");
const { StatusCodes } = require("http-status-codes");

const createNews = async (req, res) => {
  const news = await News.create(req.body);
  res.status(StatusCodes.CREATED).json({ news });
};

const getAllNewsCards = async (req, res) => {
  const allNewsCards = await News.find({});
  res.status(StatusCodes.OK).json({ allNewsCards });
};

const getFullNews = async (req, res) => {
  const { id } = req.params; // Extracting the id from the request parameters
  const newsItem = await News.findById(id);

  if (!newsItem) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "News not found" });
  }

  res.status(StatusCodes.OK).json({ newsItem });
};

const updateNews = async (req, res) => {
  const { id } = req.params;

  // Find the news item by ID and update it
  const updatedNews = await News.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedNews) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "News not found" });
  }

  res.status(StatusCodes.OK).json({ updatedNews });
};

const deleteNews = async (req, res) => {
  const { id } = req.params;

  // Find the news item by ID and delete it
  const deletedNews = await News.findOneAndDelete({ _id: id });

  if (!deletedNews) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "News not found" });
  }

  res.status(StatusCodes.OK).json({ message: "News deleted successfully" });
};

module.exports = {
  createNews,
  getAllNewsCards,
  getFullNews,
  updateNews,
  deleteNews,
};
