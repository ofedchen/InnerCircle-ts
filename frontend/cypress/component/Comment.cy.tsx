import React from 'react'
import Comment from '../../src/components/Comment.tsx'

describe('Comment component', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Comment />)
  })

  it('')
})