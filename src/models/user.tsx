// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  dob: Date;
  profileImage: string;
  idDoc: string;
  kycDoc: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  profileImage: { type: String, required: true },
  idDoc: { type: String, required: true },
  kycDoc: { type: String, required: true },
});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);
