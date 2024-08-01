import mongoose from "mongoose";
import { Schema } from "zod";

export interface StudentDocument extends Document {
    name: string;
    hallTicket: number;
    year: "1" | "2" | "3" | "4";
    batch?: string;
    dept: "BBA" | "BS";
    issuedBooks: mongoose.Types.ObjectId[]; // Assuming issuedBooks is an array of ObjectIds of books
}
const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,

    },
    hallTicket:{
        type:Number,
        unique:true,
        required:true
    },
    year:{
        type:String ,
        enum: ["1", "2", "3", "4"],
        required:true
    },
    batch:{
        type:String,
    },
    dept:{
        type:String,
        enum: ["BBA", "BS"],
        required:true
    },
    issuedBooks: [
        {
             type: mongoose.Schema.Types.ObjectId,
              ref: 'Book'
             }]
})

const Student = mongoose.model<StudentDocument>('Student', studentSchema);

export {
    Student
}