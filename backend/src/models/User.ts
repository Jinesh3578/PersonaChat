import { randomUUID } from "crypto";
import mongoose, { Schema, Document } from "mongoose";

export interface Chat {
  id: string;
  role: string;
  content: string;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  chats: Chat[];
}

const chatSchema = new Schema<Chat>({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

export default mongoose.model<UserDocument>("User", userSchema);
