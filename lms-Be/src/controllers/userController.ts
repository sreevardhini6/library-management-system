import zod from 'zod'
import {User} from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Student } from '../models/studentModel'

const signupBody = zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string()
})




export const createUser = async (req: any, res: any) => {
    const { success } = signupBody.safeParse(req.body);
    const { name, email, password, is_admin } = req.body;
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Invalid input "
        });
    }
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            });
        }
        // const salt = 10;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await User.create({
            name,
            email,
            password: hashedPassword,
            is_admin: is_admin ?? false
        });
        const userId = newuser._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
        res.json({
            message: "User created successfully",
            token: `Bearer ${token}`
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
    }
};

export const getUser = async (req:any,res:any) => {
    const { id } = req.params;
        if(!id) return res.json({msg:"id not found"})

            const existingUser = await User.findOne({
                _id: id,
            })
                if(!existingUser) return res.json({msg: " USer not available"})

                        return res.json({
                            id:existingUser._id,
                            name:existingUser.name,
                            email:existingUser.email,
                            is_admin:existingUser.is_admin,
                        })

}

export const getAllUsers = async(req:any,res:any) => {
 await User.find({}).then((users) => {
        return res.status(200).json({
            users,
        })
    })
    .catch((err) => res.json({err}))

}

export const deleteUser = async (req:any,res:any) => {  
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: 'Missing student ID' });
        }

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        return res.status(200).json({ msg: 'Student deleted successfully' });
    }catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error"});
    }
}   