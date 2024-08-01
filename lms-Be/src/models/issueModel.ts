import mongoose, { Schema, Document } from 'mongoose';

export interface IssueDocument extends Document {
    issuedDate: Date;
    book?: mongoose.Types.ObjectId | null;
    student?: mongoose.Types.ObjectId | null;
    returned: boolean; 
}

const issueSchema = new Schema({
    issuedDate: { type: Date },
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    returned: { type: Boolean, default: false }, 
});

const Issue = mongoose.model<IssueDocument>('Issue', issueSchema);

export {
    Issue
}