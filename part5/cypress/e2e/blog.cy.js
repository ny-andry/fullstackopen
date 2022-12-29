/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'very-complicated'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('very-complicated')
      cy.get('#login').click()

      cy.contains('root')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong-pass')
      cy.get('#login').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'root',
        password: 'very-complicated'
      }).then((response) =>
        localStorage.setItem('blogapp', JSON.stringify(response.body))
      )
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title-id').type('Titre du blog')
      cy.get('#author-id').type('Auteur du blog')
      cy.get('#url-id').type('sitedublog.com')
      cy.get('#create-id').click()

      cy.contains('Titre du blog')
      cy.contains('Auteur du blog')
    })

    it('Users can like a blog', () => {
      cy.contains('new blog').click()
      cy.get('#title-id').type('Titre du blog')
      cy.get('#author-id').type('Auteur du blog')
      cy.get('#url-id').type('sitedublog.com')
      cy.get('#create-id').click()

      cy.contains('view').click()
      cy.get('#like').click()

      cy.contains('likes: 1')
    })

    it('Authorized user can delete a blog', () => {
      cy.contains('new blog').click()
      cy.get('#title-id').type('Titre du blog')
      cy.get('#author-id').type('Auteur du blog')
      cy.get('#url-id').type('sitedublog.com')
      cy.get('#create-id').click()

      cy.contains('view').click()

      cy.get('#remove').click()
      cy.contains('Titre du blog').should('not.exist')
    })
  })
})
