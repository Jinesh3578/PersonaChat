// personaRoutes.js

import express from "express";
import { selectPersona } from "../controllers/persona-controller.js";
import { verifyToken } from "../utils/token-manager.js";

const personaRoutes = express.Router();

// Bug 1 fix: Added verifyToken middleware so res.locals.jwtData is populated
personaRoutes.post("/select", verifyToken, selectPersona);

export default personaRoutes;
