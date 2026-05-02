import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
import personaRoutes from "./persona.js";

const appRouter = Router();

appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/persona", personaRoutes); //domain/api/v1/persona
appRouter.use("/chat", chatRoutes); //domain/api/v1/chat

export default appRouter;
