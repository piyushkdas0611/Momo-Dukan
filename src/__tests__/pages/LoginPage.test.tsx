import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/app/login/page'
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

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<LoginPage />)
  })

  it('renders the login form', () => {
    const heading = screen.getByRole('heading', { name: /login/i })
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    expect(heading).toBeTruthy()
    expect(emailInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
    expect(submitButton).toBeTruthy()
  })

  it('allows user to type in email and password fields', async () => {
    const user = userEvent.setup()
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('submits form with valid credentials and redirects on success', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockResolvedValueOnce({ data: 'Success' })

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/login', {
        email: 'test@example.com',
        password: 'password123',
      })
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('shows error alert on invalid credentials', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockResolvedValueOnce({ data: 'Invalid' })

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'wrong@example.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitButton)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid Credentials')
    })
  })

  it('shows error alert on API failure', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'))

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Login failed. Please try again.')
    })
  })

  it('renders register link', () => {
    const registerLink = screen.getByRole('link', { name: /create here/i })
    expect(registerLink).toHaveAttribute('href', '/register')
  })

  it('requires email and password fields', () => {
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    expect(emailInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})