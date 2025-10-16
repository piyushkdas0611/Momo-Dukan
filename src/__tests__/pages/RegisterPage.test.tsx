import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterPage from '@/app/register/page'
import axios from 'axios'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock window.alert
window.alert = jest.fn()

describe('RegisterPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<RegisterPage />)
  })

  it('renders the registration form', () => {
    const heading = screen.getByRole('heading', { name: /register/i })
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    expect(heading).toBeTruthy()
    expect(emailInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
    expect(confirmPasswordInput).toBeTruthy()
    expect(submitButton).toBeTruthy()
  })

  it('allows user to fill out registration form', async () => {
    const user = userEvent.setup()
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/^password/i) as HTMLInputElement
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i) as HTMLInputElement

    await user.type(emailInput, 'newuser@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')

    expect(emailInput.value).toBe('newuser@example.com')
    expect(passwordInput.value).toBe('password123')
    expect(confirmPasswordInput.value).toBe('password123')
  })

  it('submits form successfully and redirects to login', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockResolvedValueOnce({ data: { email: 'newuser@example.com', _id: '123' } })

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    await user.type(emailInput, 'newuser@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/register', {
        email: 'newuser@example.com',
        password: 'password123',
      })
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    await user.type(emailInput, 'newuser@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'differentpassword')
    await user.click(submitButton)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Passwords do not match')
      expect(mockedAxios.post).not.toHaveBeenCalled()
    })
  })

  it('shows error alert on registration failure', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockRejectedValueOnce(new Error('Registration failed'))

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    await user.type(emailInput, 'newuser@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Registration failed. Please try again.')
    })
  })

  it('has proper input validation attributes', () => {
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    expect(emailInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(confirmPasswordInput).toHaveAttribute('required')
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  it('has proper CSS structure', () => {
    const heading = screen.getByRole('heading', { name: /register/i })
    const homeDiv = heading.closest('.home')
    const containerDiv = heading.closest('.container')

    expect(homeDiv).toBeTruthy()
    expect(containerDiv).toBeTruthy()
  })
})