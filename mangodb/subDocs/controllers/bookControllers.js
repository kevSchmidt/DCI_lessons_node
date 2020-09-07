const authorModel = require("../model/authorModel");

// ======== GET all ===
const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorModel.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ======== GET one ===
const getOneAuthor = async (req, res) => {
  try {
    const author = await authorModel.findById(req.params.id);
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ======== DELETE one ===
const deleteOneAuthor = async (req, res) => {
  try {
    const author = await authorModel.findByIdAndDelete(req.params.id);
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ======== ADD one ===
const addOneAuthor = async (req, res) => {
  console.log(req.body.books);

  const author = new authorModel({
    authorName: req.body.name,
  });

  req.body.books.map((book) =>
    author.books.push({ title: book.title, issueYear: book.year })
  );

  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = { getAllAuthors, getOneAuthor, deleteOneAuthor, addOneAuthor };
