const express = require('express');
const { getBooks, detailBook, deleteBook, updateBook, addBook, upload,imgUpload } = require('../controller/books.controller');
const { auth } = require('../controller/user.controller');
const routerBook = express.Router();
routerBook.get('/get-books', getBooks)
routerBook.get('/detail-book',auth,detailBook)
routerBook.delete('/delete-book',auth,deleteBook)
routerBook.post('/update-book',auth,updateBook)
routerBook.post('/add-book',auth,addBook)
// routerBook.post('/upload-img',imgUpload)
module.exports = routerBook;
