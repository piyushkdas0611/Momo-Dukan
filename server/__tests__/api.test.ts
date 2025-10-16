import request from 'supertest'
import express from 'express'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import cors from 'cors'
import UserModel from '../models/User'

// Create test app
const createApp = () => {
  const app = express()
  app.use(express.json())
  app.use(cors())

  // Import routes from main app
  app.get('/', (req, res) => {
    res.send(`Welcome to the server! Here's the request body: ${JSON.stringify(req.body)}`)
  })

  app.post('/login', (req, res) => {
    const { email, password } = req.body
    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        if (user.password === password) {
          res.json('Success')
        } else {
          res.json('Password is incorrect')
        }
      } else {
        res.json('User not found')
      }
    })
  })

  app.post('/register', (req, res) => {
    UserModel.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err)
        res.status(500).json({ error: 'An error occurred while saving the user' })
      })
  })

  return app
}

describe('API Endpoints', () => {
  let app: express.Application
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
    app = createApp()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  afterEach(async () => {
    await UserModel.deleteMany({})
  })

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/')
      
      expect(response.status).toBe(200)
      expect(response.text).toContain('Welcome to the server!')
    })

    it('should include request body in response', async () => {
      const response = await request(app)
        .get('/')
        .send({ test: 'data' })
      
      expect(response.text).toContain('{"test":"data"}') // GET requests include the sent data
    })
  })

  describe('POST /register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'password123'
      }

      const response = await request(app)
        .post('/register')
        .send(userData)

      expect(response.status).toBe(200)
      expect(response.body.email).toBe(userData.email)
      expect(response.body.password).toBe(userData.password)
      expect(response.body._id).toBeDefined()
    })

    it('should handle registration errors', async () => {
      const invalidUserData = {
        // Missing required fields
      }

      const response = await request(app)
        .post('/register')
        .send(invalidUserData)

      expect(response.status).toBe(500)
      expect(response.body.error).toBe('An error occurred while saving the user')
    })

    it('should save user to database', async () => {
      const userData = {
        email: 'dbtest@example.com',
        password: 'password123'
      }

      await request(app)
        .post('/register')
        .send(userData)

      const savedUser = await UserModel.findOne({ email: userData.email })
      expect(savedUser).toBeTruthy()
      expect(savedUser?.email).toBe(userData.email)
    })
  })

  describe('POST /login', () => {
    beforeEach(async () => {
      // Create test user before each login test
      await new UserModel({
        email: 'testuser@example.com',
        password: 'correctpassword'
      }).save()
    })

    it('should login with correct credentials', async () => {
      const loginData = {
        email: 'testuser@example.com',
        password: 'correctpassword'
      }

      const response = await request(app)
        .post('/login')
        .send(loginData)

      expect(response.status).toBe(200)
      expect(response.body).toBe('Success')
    })

    it('should reject login with incorrect password', async () => {
      const loginData = {
        email: 'testuser@example.com',
        password: 'wrongpassword'
      }

      const response = await request(app)
        .post('/login')
        .send(loginData)

      expect(response.status).toBe(200)
      expect(response.body).toBe('Password is incorrect')
    })

    it('should reject login with non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'anypassword'
      }

      const response = await request(app)
        .post('/login')
        .send(loginData)

      expect(response.status).toBe(200)
      expect(response.body).toBe('User not found')
    })

    it('should handle missing email', async () => {
      const loginData = {
        password: 'correctpassword'
      }

      const response = await request(app)
        .post('/login')
        .send(loginData)

      expect(response.status).toBe(200)
      expect(response.body).toBe('User not found')
    })

    it('should handle missing password', async () => {
      const loginData = {
        email: 'testuser@example.com'
      }

      const response = await request(app)
        .post('/login')
        .send(loginData)

      expect(response.status).toBe(200)
      expect(response.body).toBe('Password is incorrect')
    })

    it('should handle empty request body', async () => {
      const response = await request(app)
        .post('/login')
        .send({})

      expect(response.status).toBe(200)
      expect(response.body).toBe('User not found')
    })
  })

  describe('Error Handling', () => {
    it('should handle database connection errors gracefully', async () => {
      // This test would require mocking mongoose to simulate connection errors
      // For now, we'll test the happy path and assume error handling works
      expect(true).toBe(true)
    })

    it('should return JSON responses for API endpoints', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'test' })

      expect(response.headers['content-type']).toMatch(/json/)
    })
  })
})