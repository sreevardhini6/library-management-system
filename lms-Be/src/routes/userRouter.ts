import express from 'express'
import zod from 'zod'
import { createUser, deleteUser, getAllUsers, getUser } from '../controllers/userController';
import { isAdmin, isAuthenticated } from '../middlewares/auth';
const router = express.Router();

router.post("/",createUser)
router.get("/:id", getUser)
router.get("/", isAdmin,getAllUsers)
router.delete("/:id", isAdmin, deleteUser)



export { router as userRouter}

