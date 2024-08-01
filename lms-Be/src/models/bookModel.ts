import mongoose, { Document, Model } from 'mongoose';

export interface BookDocument extends Document {
  accessionNo: string;
  author: string;
  title: string;
  edition: string;
  pages: number;
  volume: number;
  publisher: string;
  source: string;
  billdate: Date;
  cost: number;
  rackno: string;
  withdrawldate?: Date;
}

const bookSchema = new mongoose.Schema<BookDocument>({
  accessionNo: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  edition: { type: String, required: true },
  pages: { type: Number, required: true },
  volume: { type: Number, required: true },
  publisher: { type: String, required: true },
  source: { type: String, required: true },
  billdate: { type: Date, required: true },
  cost: { type: Number, required: true },
  rackno: { type: String, required: true },
  withdrawldate: { type: Date } // Optional field
}, {
  timestamps: true
});

const Book: Model<BookDocument> = mongoose.model<BookDocument>('Book', bookSchema);


export {
    Book
}