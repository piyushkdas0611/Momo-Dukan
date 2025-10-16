import { render, screen } from '@testing-library/react'
import AboutPage from '@/app/about/page'

describe('AboutPage Component', () => {
  beforeEach(() => {
    render(<AboutPage />)
  })

  it('renders the about page', () => {
    const aboutDiv = screen.getByText('About Us').closest('.about')
    expect(aboutDiv).toBeTruthy()
  })

  it('displays all main headings', () => {
    const headings = [
      'About Us',
      'Our Story',
      'Our Mission',
      'Quality and Freshness',
      'Variety of Flavors',
      'Dedicated Team',
      'Community and Sustainability',
      'Join the Momo Dukan Family'
    ]

    headings.forEach(heading => {
      const headingElement = screen.getByRole('heading', { name: heading })
      expect(headingElement).toBeTruthy()
    })
  })

  it('displays the main tagline', () => {
    const tagline = screen.getByRole('heading', { name: /discover the joy of momo/i })
    expect(tagline).toBeTruthy()
  })

  it('contains welcome message', () => {
    const welcomeText = screen.getByText(/Welcome to Momo Dukan, your ultimate destination/)
    expect(welcomeText).toBeTruthy()
  })

  it('describes the company story', () => {
    const storyText = screen.getByText(/Momo Delights was born out of a deep love/)
    expect(storyText).toBeTruthy()
  })

  it('mentions Nepal in the story section', () => {
    const nepalReference = screen.getByText(/bustling streets of Nepal/)
    expect(nepalReference).toBeTruthy()
  })

  it('describes the mission statement', () => {
    const missionText = screen.getByText(/At Momo Dukan, we are dedicated to crafting momos/)
    expect(missionText).toBeTruthy()
  })

  it('talks about quality and freshness', () => {
    const qualityText = screen.getByText(/We take immense pride in the quality and freshness/)
    expect(qualityText).toBeTruthy()
  })

  it('mentions variety of flavors', () => {
    const varietyText = screen.getByText(/At Momo Delights, we believe in pushing the boundaries/)
    expect(varietyText).toBeTruthy()
  })

  it('describes the dedicated team', () => {
    const teamText = screen.getByText(/Our success would not be possible without the dedication/)
    expect(teamText).toBeTruthy()
  })

  it('mentions community and sustainability', () => {
    const communityText = screen.getByText(/We cherish the communities that have embraced momo/)
    expect(communityText).toBeTruthy()
  })

  it('invites users to join the family', () => {
    const joinText = screen.getByText(/Come and experience the magic of momo at Momo Dukan/)
    expect(joinText).toBeTruthy()
  })

  it('has proper semantic structure with headings and paragraphs', () => {
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    const h2Elements = screen.getAllByRole('heading', { level: 2 })
    
    expect(h1Elements.length).toBeGreaterThan(0)
    expect(h2Elements.length).toBeGreaterThan(0)
  })

  it('contains all required content sections', () => {
    const contentSections = [
      /ultimate destination for all things momo/,
      /born out of a deep love/,
      /dedicated to crafting momos/,
      /immense pride in the quality/,
      /pushing the boundaries of flavor/,
      /success would not be possible/,
      /cherish the communities/,
      /experience the magic of momo/
    ]

    contentSections.forEach(pattern => {
      const element = screen.getByText(pattern)
      expect(element).toBeTruthy()
    })
  })
})