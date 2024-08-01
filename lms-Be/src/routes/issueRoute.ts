import express from 'express'
import { isAdmin } from '../middlewares/auth'
import { getAllIssuedBooks, getIssuedBookById, getReturnedBooks, issueBook, returnBook } from '../controllers/issueController'

const router = express.Router()

router.post("/", isAdmin,issueBook)
router.get("/",isAdmin, getAllIssuedBooks)
router.get("/:id",isAdmin, getIssuedBookById)
router.get("/returned",isAdmin, getReturnedBooks)
router.put("/returned/:id",isAdmin, returnBook)



export { router as issueRouter}