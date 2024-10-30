import mongoose, { Document, Schema } from "mongoose";

interface Student extends Document {
  name: string;
  age: number;
  course: string;
  email: string;
  phone: string;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

export default mongoose.model<Student>("Student", StudentSchema);