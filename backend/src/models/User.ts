import { randomUUID } from "crypto";
import mongoose, { Schema, Document } from "mongoose";

export interface Chat {
  id: string;
  role: string;
  content: string;
  persona: string; // Add persona field
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  chats: Chat[];
  persona: string; // Add persona field
  customPrompt: string; // Add customPrompt field for custom personas
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
  persona: {
    type: String,
    required: true, // Ensure persona is required
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
  persona: {
    type: String,
    required: true, // Ensure persona is required
  },
  customPrompt: {
    type: String,
    default: '',
  },
});

export default mongoose.model<UserDocument>("User", userSchema);
