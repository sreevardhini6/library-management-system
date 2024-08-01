import {z} from 'zod'
import { Student , StudentDocument } from '../models/studentModel';
import { json } from 'express';

interface StudentProps {
    name:string;
    hallTicket:number;
    year: "1" | "2" | "3" | "4";
    batch?:string;
    dept: "BBA" | "BS"
}

const updateStudentBody = z.object({
    name: z.string().trim().optional(),
    hallTicket: z.number().optional(),
    year: z.enum(["1", "2", "3", "4"]).optional(),
    batch: z.string().optional(),
    dept: z.enum(["BBA", "BS"]).optional(),
});

const studentBody = z.object({
    name:z.string().trim().max(30),
    hallTicket:z.number(),
    year: z.enum(["1", "2", "3", "4"]),
    batch: z.string().optional(),
    dept: z.enum(["BBA", "BS"]),
})




export const createStudent = async(req: any, res: any) =>{
    const result = studentBody.safeParse(req.body);
    const {name, hallTicket , year, batch , dept} = req.body;

    if(!result) {
        return res.json(411).json({
            message:"Invalid Inputs",
        })
    }
    // const { name, hallTicket, year, batch, dept } = result.data;
        try {
               const existingStudent = await Student.findOne({ hallTicket })
               if(existingStudent) return res.status(411).json({message: "Student already exits"})

                const student = new Student ({ name,hallTicket,year,batch,dept });
                await student.save()
                return res.status(201).json(student)
        } catch (err) {
                console.error(err)
                return res.status(500).json({msg:"Server Error"})

        }

}
export const getAllstudents = async (req: any, res: any) =>{
    try {
            const students = await Student.find()
            return res.status(200).json(students)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
}
export const getStudent = async (req: any, res: any) =>{
    const {id} = req.params
    if(!id) return res.json({msg:"id not provided"})

        try {
            const student = await Student.findById(id).populate({
                path: 'issuedBooks',
                populate: {
                    path: 'book', 
                    select: 'title author' 
                  }
            });
            console.log(student)
                if (!student) return res.status(404).json({ msg: "Student not available" });
        
            return res.status(200).json(student);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Server Error' });
        }
}
export const updateStudent = async (req: any, res: any) =>{
    const {id} = req.params;
    const {success,data} = updateStudentBody.safeParse(req.body)
    if (!success) {
        return res.status(400).json({
            message: "Invalid Inputs",
        });
    }
    try {
        const updatestudent = await Student.findByIdAndUpdate(id,
            data,{new:true}
        )
        if(!updateStudent) return res.status(404).json({msg:"Student not found"})

    
            return res.status(200).json({
                message: "Updated successfully",
                data: updateStudent,
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
}
export const deleteStudent = async(req: any, res: any) =>{
    try {
            const { id } = req.params;
            const student = await Student.findByIdAndDelete(id)
            if (!student) {
                return res.status(404).json({ msg: 'Student not found' });
            }
            return res.status(200).json({ msg: 'Student deleted successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
        
    }
}