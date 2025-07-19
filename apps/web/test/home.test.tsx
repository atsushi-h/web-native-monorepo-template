import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders hello world text', () => {
    render(<Home />)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('has main element with correct class', () => {
    render(<Home />)

    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
