import zod, { object } from 'zod'
import { Book } from '../models/bookModel';
    

const bookBody = zod.object({
    accessionNo: zod.string(),
    author: zod.string(),
    title: zod.string(),
    edition: zod.string().optional(),
    pages: zod.number().positive(),
    volume: zod.string().optional(),
    publisher: zod.string(),
    source: zod.string(),
    billdate: zod.string(),
    cost: zod.number().positive(),
    rackno: zod.string(),
    withdrawldate: zod.date().optional()
});

export const createBook = async (req:any, res:any) => {
  try {
    const result = bookBody.safeParse(req.body)
    // console.log("RESult"+result)
    if(!result.success){
        return res.status(400).json({
            msg:"Invalid Input",
            errors: result.error.errors
        })
    }
        const newBook = new Book(result.data)
        // console.log("NEW boooookd"+newBook)
        await newBook.save();

        return res.status(201).json({
            message:"Book created Successfullly",
            book:newBook
        })

  } catch (err) {
    res.status(500).json({
        message: "Server error",
        error: err
    });

  }}

export const getAllBook = async (req:any, res:any) => { 
    try {
        let { page = 1, limit = 10, search = '' } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
    
        const skip = (page - 1) * limit;
    
        const filter: any = {};
        if (search) {
            const regexFilter = { $regex: new RegExp(search, 'i') };
            filter.$or = [
                { title: regexFilter },
                { author: regexFilter },
                { accessionNo: regexFilter },
            ];
        }
    
        const books = await Book.find(filter)
            .skip(skip)
            .limit(limit);
        
        const totalBooks = await Book.countDocuments(filter);
    
        const totalPages = Math.ceil(totalBooks / limit);
    
        res.json({
            books,
            totalPages,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
    
    }

}

export const getBook = async (req:any, res:any) => {
        try {
            const {id } = req.params;
            // console.log(id)
                const book = await Book.find({_id:id})
                // console.log(book)
                    if(!book) {
                        return res.status(404).json({
                            message:"Book not Found"
                        })
                    }
                    res.status(200).json(book)
        } catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err
            });
        
            
        }
}

export const deleteBook = async (req:any, res:any) => {
    try {
            const {id} = req.params;
            const deletedBook = await Book.findByIdAndDelete(id);

            if(!deletedBook) {
                return res.status(404).json({
                    msg:"Book not found"
                })
            }
            return res.status(200).json({
                msg:"Book Deleted Successfully",
                book:deletedBook
            })
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
        
    }
}

export const updateBook = async(req:any,res:any) =>{ 
    const {id} = req.params;
    console.log(id)
    const updates = req.body
    console.log(updates)
    try {
            const book = await Book.findById(id)
            if(!book) {
                return res.status(404).json({msg:"Book not found"})
            }
            Object.assign(book, updates);
            const updatedBook = await book.save();

            return res.status(200).json({ msg: "Book Updated Successfully", book: updatedBook });
            
    } catch (err) {
            return res.status(500).json({msg:"Server Error"})
    }
}