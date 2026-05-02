import mongoose from 'mongoose';
import { beforeAll, afterAll } from 'vitest';
import { config } from 'dotenv';
import { connectToDatabase, disconnectFromDatabase } from '../db/connection.js';

config();

beforeAll(async () => {
  if (mongoose.connection.readyState !== 1) {
    await connectToDatabase();
  }
});

afterAll(async () => {
  await disconnectFromDatabase();
});
