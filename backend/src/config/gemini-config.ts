import { GoogleGenerativeAI } from "@google/generative-ai";

export const configureGoogleAI = () => {
  const client = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  return client;
};
