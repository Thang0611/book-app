const express = require('express');
const { getBooks, detailBook, deleteBook, updateBook, addBook } = require('../controller/books.controller');
const { auth } = require('../controller/user.controller');
const routerBook = express.Router();
routerBook.get('/get-books', getBooks)
routerBook.get('/detail-book/:_id',detailBook)
routerBook.delete('/delete-book/:_id',deleteBook)
routerBook.put('/update-book/:_id',updateBook)
routerBook.post('/add-book',addBook)
module.exports = routerBook;
