const Book = require("../models/Book");
const { StatusCodes } = require("http-status-codes");

const createBook = async (req, res) => {
 
    const book = await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ book });
};

const getAllBook = async (req, res) => {
    const allBooks = await Book.find({});
    res.status(StatusCodes.OK).json({ allBooks });
};

const updateBook = async (req, res) => {
    const { id } = req.params;

    // Find the news item by ID and update it
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedBook) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Book not found" });
    }

    res.status(StatusCodes.OK).json({ updatedBook });
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    // Find the book item by ID and delete it
    const deletedBook = await Book.findOneAndDelete({ _id: id });

    if (!deletedBook) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Book not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Book deleted successfully" });
};


module.exports = {
    createBook,
    getAllBook,
    updateBook,
    deleteBook,
};
