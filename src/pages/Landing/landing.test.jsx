import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@pages/Home'

describe('Home', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('has a login button', () => {
    expect(
      screen.getByText(/login/i, { selector: 'button' })
    ).toBeInTheDocument()
  })

  it('has a get started button', () => {
    expect(
      screen.getByText(/get started/i, { selector: 'button' })
    ).toBeInTheDocument()
  })
})
