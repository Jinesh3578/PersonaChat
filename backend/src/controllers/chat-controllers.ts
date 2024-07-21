import { NextFunction, Request, Response } from "express";
import User, { UserDocument, Chat } from "../models/User.js";
import { randomUUID } from "crypto";
import { configureGoogleAI } from "../config/gemini-config.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    // Create new chat entry
    const newChat: Chat = {
      id: randomUUID(),
      role: "user",
      content: message,
      persona: user.persona,
    };

    // Push new chat entry to user's chats array
    user.chats.push(newChat);

    // Prepare prompt based on persona
    let personaPrompt = "";
    if (user.persona === "custom") {
      personaPrompt = user.customPrompt;
    } else {
      personaPrompt = `You are a ${user.persona} personality.`;
    }

    // Send all chats with new one to Google AI API
    const client = configureGoogleAI();
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate response
    const result = await model.generateContent([{ text: `${personaPrompt} ${message}` }]);
    const response = await result.response;
    const generatedMessage = await response.text();

    // Push AI generated response to user's chats array
    user.chats.push({
      id: randomUUID(),
      role: "assistant",
      content: generatedMessage,
      persona: user.persona,
    });

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // Clear user's chats array
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
