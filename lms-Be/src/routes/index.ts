import express from 'express'
import { userRouter } from './userRouter'
import { bookRouter } from './bookRouter'
import { issueRouter } from './issueRoute'
import { authRouter } from './authRoute'
import { studentRouter } from './studentRouter'
import { isAdmin, isAuthenticated } from '../middlewares/auth'

const router = express.Router()

router.use("/user",userRouter)
router.use("/student",studentRouter)
router.use("/book",bookRouter)
router.use("/issue",issueRouter)
router.use("/auth",authRouter)


export {router as mainRouter}