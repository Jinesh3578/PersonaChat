// personaRoutes.js

import express from "express";
import { selectPersona } from "../controllers/persona-controller.js";

const personaRoutes = express.Router();

personaRoutes.post("/select", selectPersona);

personaRoutes.post("/chat/new", async (req, res) => {
  const { message, persona } = req.body;
  // For now, return mock response
  res.json({ chats: [
    { role: 'user', content: message, persona },
    { role: 'assistant', content: `Hello! You are chatting as ${persona}.`, persona }
  ] });
});

export default personaRoutes;
