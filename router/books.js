const express = require('express');
const { getBooks, detailBook, deleteBook, updateBook, addBook } = require('../controller/books.controller');
const routerBook = express.Router();

routerBook.post('/get-books', getBooks)
routerBook.post("/detail-book",detailBook)
routerBook.post('/delete-book',deleteBook)
routerBook.post('/update-book',updateBook)
routerBook.post('/add-book',addBook)
module.exports = routerBook;
