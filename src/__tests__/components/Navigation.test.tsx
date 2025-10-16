import { render, screen } from '@testing-library/react'
import Navigation from '@/components/Navigation'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
  ),
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    render(<Navigation />)
  })

  it('renders the navigation component', () => {
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('displays the Momo Dukan logo and title', () => {
    const logoImage = screen.getByAltText('icon')
    const title = screen.getByText('MOMO DUKAN')
    
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', '/images/momo.png')
    expect(title).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    const homeLink = screen.getByRole('link', { name: /home/i })
    const loginLink = screen.getByRole('link', { name: /login/i })
    const contactLink = screen.getByRole('link', { name: /contact/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })

    expect(homeLink).toBeInTheDocument()
    expect(loginLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })

  it('has correct href attributes for navigation links', () => {
    const homeLink = screen.getByRole('link', { name: /home/i })
    const loginLink = screen.getByRole('link', { name: /login/i })
    const contactLink = screen.getByRole('link', { name: /contact/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })

    expect(homeLink).toHaveAttribute('href', '/')
    expect(loginLink).toHaveAttribute('href', '/login')
    expect(contactLink).toHaveAttribute('href', '/contact')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('has proper structure with icon and navigation list', () => {
    const iconDiv = screen.getByText('MOMO DUKAN').parentElement
    const navList = screen.getByRole('list')

    expect(iconDiv).toHaveClass('icon')
    expect(navList).toBeInTheDocument()
  })
})