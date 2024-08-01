import express from 'express'
import { isAdmin, isAuthenticated } from '../middlewares/auth'
import { createBook, deleteBook, getAllBook, getBook, updateBook } from '../controllers/bookController'
import paginationMiddleware from '../middlewares/pagination'
import {Book} from "../models/bookModel"

const router = express.Router()
router.get("/",isAuthenticated,paginationMiddleware(Book),getAllBook)
router.post("/",isAdmin,createBook)
router.get("/:id", getBook)
router.delete("/:id",isAdmin,deleteBook)
router.put("/:id",isAdmin,updateBook)

export {router as bookRouter}