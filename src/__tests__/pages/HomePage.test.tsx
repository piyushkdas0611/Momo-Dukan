import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock useEffect for body style changes
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}))

describe('HomePage Component', () => {
  beforeEach(() => {
    render(<HomePage />)
  })

  it('renders the home page', () => {
    const homeDiv = screen.getByText('MOMO DUKAN').closest('.home')
    expect(homeDiv).toBeTruthy()
  })

  it('displays the main heading', () => {
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('MOMO DUKAN')
  })

  it('displays descriptive paragraphs about momos', () => {
    const firstParagraph = screen.getByText(/Momo, the delightful dumpling of the Himalayas/)
    const secondParagraph = screen.getByText(/Momo is more than just a dish/)
    
    expect(firstParagraph).toBeTruthy()
    expect(secondParagraph).toBeTruthy()
  })

  it('renders the login button with correct link', () => {
    const loginButton = screen.getByRole('button', { name: /login/i })
    const loginLink = loginButton.closest('a')
    
    expect(loginButton).toBeTruthy()
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('displays the couple discount message', () => {
    const discountText = screen.getByText(/Couple Discount Available!/i)
    expect(discountText).toBeTruthy()
  })

  it('has proper CSS classes for styling', () => {
    const homeDiv = screen.getByText('MOMO DUKAN').closest('.home')
    const containerDiv = screen.getByText('MOMO DUKAN').closest('.container')
    
    expect(homeDiv).toBeTruthy()
    expect(containerDiv).toBeTruthy()
  })

  it('calls useEffect to manage body overflow', () => {
    const React = require('react')
    expect(React.useEffect).toHaveBeenCalled()
  })
})