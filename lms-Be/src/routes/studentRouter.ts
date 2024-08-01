import express from 'express'
import zod from 'zod'
import { createUser, deleteUser, getAllUsers, getUser } from '../controllers/userController';
import { isAdmin, isAuthenticated } from '../middlewares/auth';
import { createStudent, getAllstudents, getStudent, updateStudent } from '../controllers/studentController';
const router = express.Router();

router.post("/",isAdmin,createStudent)
router.get("/:id",isAdmin, getStudent)
router.get("/",isAdmin,getAllstudents)
router.put("/:id",isAdmin, updateStudent)
router.delete("/:id",isAdmin,deleteUser)



export { router as studentRouter}

