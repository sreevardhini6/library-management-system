import { Request, Response } from 'express';
import { Book } from '../models/bookModel';
import { Student } from '../models/studentModel';
import { Issue , IssueDocument} from '../models/issueModel';
import { isValidObjectId } from 'mongoose';




export const issueBook = async (req: Request, res: Response) => {
    const { id, accessionNo, issuedDate } = req.body;

    console.log('Received request to issue book:', { id, accessionNo, issuedDate });
    
    if (!id || !accessionNo || !issuedDate) {
        console.log('Missing required fields:', { id, accessionNo, issuedDate });
        return res.status(400).json({
            msg: "Please enter all fields"
        });
    }

    try {
        const student = await Student.findById(id);
        const book = await Book.findOne({ accessionNo });
        if (!book) {
            console.log('Book not found with accessionNo:', accessionNo);
            return res.status(404).json({ msg: "Book not found" });
        }
        if (!student) {
            console.log('Student not found with id:', id);
            return res.status(404).json({ msg: "Student not found" });
        }
        if(book.volume <= 0) {
            return res.status(400).json({ msg:"No copies Available to issue"  })
        }
        const existingIssue = await Issue.findOne({ book: book._id, student: student._id, returned: false });
        if (existingIssue) {
            return res.status(400).json({ msg: "Book is already issued to this student" });
        }
        const issue = new Issue({
            student: student._id,
            book: book._id,
            issuedDate: new Date(issuedDate)
        });
        await issue.save();
        book.volume -= 1;
        await book.save()

        await Student.findByIdAndUpdate(student._id, {
            $push: { issuedBooks: issue._id }
        });
        return res.status(200).json({
            msg: "Book issued to the student",
            issue
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};


export const getAllIssuedBooks = async (req: Request, res: Response) => {
    try {
        const issues = await Issue.find().populate('book').populate('student');
        return res.status(200).json(issues);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

export const getIssuedBookById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const issue = await Issue.findById(id).populate('book').populate('student');
        if (!issue) {
            return res.status(404).json({ msg: "Issue not found" });
        }
        return res.status(200).json(issue);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};



export const returnBook = async (req: Request, res: Response) => {
    const { id } = req.params; 
    console.log(id)
    try {
        if (!id) {
            return res.status(400).json({ msg: "ID not provided" });
        }
        const issue = await Issue.findById(id);
        // console.log(issue)
        if (!issue) {
            return res.status(404).json({ msg: "Issue not found" });
        }
        issue.returned = true;
        await issue.save();
        
        const book = await Book.findById(issue.book);
        if (book) {
            book.volume += 1;
            await book.save();
        }
        
        await Student.findByIdAndUpdate(issue.student, {
            $pull: { issuedBooks: issue._id }
        });
        return res.status(200).json({ msg: "Book returned successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};



export const getReturnedBooks = async (req: Request, res: Response) => {

    try {

        const returnedBooks = await Issue.find({returned:true}).populate('book').populate('student');
        console.log(returnedBooks)
        return res.status(200).json(returnedBooks);
    } catch (err) {
        console.error('Error fetching returned books:', err); 
        return res.status(500).json({ msg: 'Server Error' });
    }
};
