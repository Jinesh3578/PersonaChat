import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

export const selectPersona = async (req: Request, res: Response, next: NextFunction) => {
  const { persona, customPrompt } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.persona = persona;
    if (persona === 'custom') {
      user.customPrompt = customPrompt;
    } else {
      user.customPrompt = '';
    }

    await user.save();

    const redirectPath = `/persona.${persona}-${user._id}`;

    return res.status(200).json({ message: 'Persona selected successfully', redirectPath });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
