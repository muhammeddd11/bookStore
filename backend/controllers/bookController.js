const Book = require("../models/bookModel");
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.status(201).json({
    message: "All books fetched",
    length: books.length,
    books,
  });
};
exports.getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(400).json({
      message: "this book is not found",
    });
  }
  res.status(201).json({
    message: "Book found",
    book,
  });
};
exports.updateBook = async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedBook) {
    res.status(400).json({
      message: "Un eroor occured while updating the book",
    });
  }
  res.status(201).json({
    message: "Book updated",
    updatedBook,
  });
};

exports.createBook = async (req, res) => {
  const { publishYear, author, title } = req.body;
  const newBook = await Book.create({ publishYear, author, title });
  if (!newBook) {
    return res.status(400).json({
      message: "Failed to create book",
    });
  }
  res.status(201).json({
    message: "New book created successfully",
    newBook,
  });
};
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).json({
    message: "book deleted successfully",
  });
};
