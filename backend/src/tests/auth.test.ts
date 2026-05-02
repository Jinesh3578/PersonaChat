import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import User from '../models/User.js';

describe('Auth API Routes', () => {
  describe('POST /api/v1/user/signup', () => {
    it('should create a new user and return 201', async () => {
      const response = await request(app)
        .post('/api/v1/user/signup')
        .send({
          name: 'TestUser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('OK');
      expect(response.body.name).toBe('TestUser');
      expect(response.body.email).toBe('test@example.com');

      const user = await User.findOne({ email: 'test@example.com' });
      expect(user).not.toBeNull();
      expect(user?.name).toBe('TestUser');
    });

    it('should fail if email is already registered', async () => {
      // First signup
      await request(app).post('/api/v1/user/signup').send({
        name: 'TestUser',
        email: 'test@example.com',
        password: 'password123',
      });

      // Second signup with same email
      const response = await request(app)
        .post('/api/v1/user/signup')
        .send({
          name: 'AnotherUser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
      expect(response.text).toBe('User already registered');
    });
  });

  describe('POST /api/v1/user/login', () => {
    it('should login an existing user and return 200', async () => {
      await request(app).post('/api/v1/user/signup').send({
        name: 'TestUser',
        email: 'test@example.com',
        password: 'password123',
      });

      const response = await request(app)
        .post('/api/v1/user/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('OK');
      
      // Verify cookie is set
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toContain('auth_token'); // COOKIE_NAME
    });

    it('should fail with incorrect password', async () => {
      const response = await request(app)
        .post('/api/v1/user/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(403);
      expect(response.text).toBe('Incorrect Password');
    });
  });
  // Cleanup test user
  afterAll(async () => {
    await User.deleteMany({ email: 'test@example.com' });
  });
});
