import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import UserModel, { IUser } from '../models/User'

describe('User Model', () => {
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  afterEach(async () => {
    await UserModel.deleteMany({})
  })

  describe('User Schema Validation', () => {
    it('should create a user with valid email and password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      }

      const user = new UserModel(userData)
      const savedUser = await user.save()

      expect(savedUser._id).toBeDefined()
      expect(savedUser.email).toBe(userData.email)
      expect(savedUser.password).toBe(userData.password)
    })

    it('should require email field', async () => {
      const userData = {
        password: 'password123'
      }

      const user = new UserModel(userData)
      
      await expect(user.save()).rejects.toThrow()
    })

    it('should require password field', async () => {
      const userData = {
        email: 'test@example.com'
      }

      const user = new UserModel(userData)
      
      await expect(user.save()).rejects.toThrow()
    })

    it('should save multiple users with different emails', async () => {
      const userData1 = {
        email: 'user1@example.com',
        password: 'password123'
      }

      const userData2 = {
        email: 'user2@example.com',
        password: 'password456'
      }

      const user1 = new UserModel(userData1)
      const user2 = new UserModel(userData2)

      const savedUser1 = await user1.save()
      const savedUser2 = await user2.save()

      expect(savedUser1.email).toBe(userData1.email)
      expect(savedUser2.email).toBe(userData2.email)
    })

    it('should find user by email', async () => {
      const userData = {
        email: 'findme@example.com',
        password: 'password123'
      }

      await new UserModel(userData).save()
      const foundUser = await UserModel.findOne({ email: userData.email })

      expect(foundUser).toBeTruthy()
      expect(foundUser?.email).toBe(userData.email)
      expect(foundUser?.password).toBe(userData.password)
    })

    it('should return null when user is not found', async () => {
      const foundUser = await UserModel.findOne({ email: 'nonexistent@example.com' })
      expect(foundUser).toBeNull()
    })

    it('should update user information', async () => {
      const userData = {
        email: 'update@example.com',
        password: 'oldpassword'
      }

      const user = await new UserModel(userData).save()
      user.password = 'newpassword'
      const updatedUser = await user.save()

      expect(updatedUser.password).toBe('newpassword')
    })

    it('should delete user', async () => {
      const userData = {
        email: 'delete@example.com',
        password: 'password123'
      }

      const user = await new UserModel(userData).save()
      await UserModel.findByIdAndDelete(user._id)
      
      const deletedUser = await UserModel.findById(user._id)
      expect(deletedUser).toBeNull()
    })

    it('should have correct model name', () => {
      expect(UserModel.modelName).toBe('momo-dukan')
    })

    it('should validate email format (if validation is added)', async () => {
      // This test assumes you might want to add email validation later
      const userData = {
        email: 'invalid-email',
        password: 'password123'
      }

      const user = new UserModel(userData)
      // Currently this will pass, but you could add email validation to the schema
      const savedUser = await user.save()
      expect(savedUser.email).toBe(userData.email)
    })
  })
})