import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactPage from '@/app/contact/page'

// Mock window.alert
window.alert = jest.fn()

describe('ContactPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<ContactPage />)
  })

  it('renders the contact form', () => {
    const heading = screen.getByRole('heading', { name: /give feedback/i })
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const phoneInput = screen.getByLabelText(/phone/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })

    expect(heading).toBeTruthy()
    expect(nameInput).toBeTruthy()
    expect(emailInput).toBeTruthy()
    expect(phoneInput).toBeTruthy()
    expect(messageInput).toBeTruthy()
    expect(submitButton).toBeTruthy()
  })

  it('allows user to fill out all form fields', async () => {
    const user = userEvent.setup()
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const phoneInput = screen.getByLabelText(/phone/i) as HTMLInputElement
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(phoneInput, '1234567890')
    await user.type(messageInput, 'Great momos!')

    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect(phoneInput.value).toBe('1234567890')
    expect(messageInput.value).toBe('Great momos!')
  })

  it('submits the form and shows success message', async () => {
    const user = userEvent.setup()
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const phoneInput = screen.getByLabelText(/phone/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(phoneInput, '1234567890')
    await user.type(messageInput, 'Great momos!')
    await user.click(submitButton)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Feedback submitted successfully!')
    })
  })

  it('has proper form validation attributes', () => {
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const phoneInput = screen.getByLabelText(/phone/i)
    const messageInput = screen.getByLabelText(/message/i)

    expect(nameInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(phoneInput).toHaveAttribute('required')
    expect(phoneInput).toHaveAttribute('type', 'tel')
    expect(messageInput).toHaveAttribute('required')
  })

  it('resets form state correctly when fields are cleared', async () => {
    const user = userEvent.setup()
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement

    await user.type(nameInput, 'Test Name')
    expect(nameInput.value).toBe('Test Name')

    await user.clear(nameInput)
    expect(nameInput.value).toBe('')
  })

  it('has proper CSS classes for styling', () => {
    const homeDiv = screen.getByText('Give Feedback').closest('.home')
    const contactContainer = screen.getByText('Give Feedback').closest('.contact-container')

    expect(homeDiv).toBeTruthy()
    expect(contactContainer).toBeTruthy()
  })

  it('prevents form submission with empty required fields', async () => {
    const user = userEvent.setup()
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.click(submitButton)
    
    // Form should not submit due to HTML5 validation
    expect(window.alert).not.toHaveBeenCalled()
  })
})