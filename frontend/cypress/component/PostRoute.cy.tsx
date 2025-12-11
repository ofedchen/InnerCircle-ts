import React from 'react'
import PostRoute from '../../src/routes/Post_Route.js'

describe('<PostRoute />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PostRoute />)
  })
})