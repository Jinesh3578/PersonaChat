// personaRoutes.js
import express from "express";

const personaRoutes = express.Router();

personaRoutes.post("/select", async (req, res) => {
  const { persona, customPrompt } = req.body;
  const userId = req.body.user.email; // Assume you have middleware to get the authenticated user
  // Save the selected persona and customPrompt to the database
  // Redirect path based on persona
  res.json({ redirectPath: `/persona.${persona}-${userId}` });
});

personaRoutes.post("/chat/new", async (req, res) => {
  const { message, persona } = req.body;
  // Handle chat request with persona context
  res.json({ chats: [] }); // Example response
});

export default personaRoutes;
