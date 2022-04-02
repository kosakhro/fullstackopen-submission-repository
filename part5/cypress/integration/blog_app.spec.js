/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const guest = {
      name: 'guest',
      username: 'guest',
      password: 'guest'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', guest)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('button').contains('log in').click()
    cy.contains('username')
    cy.contains('password')
    cy.get('#login-button').contains('login')
    cy.contains('cancel')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('button').contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('button').contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.get('button').contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Author of blog')
      cy.get('#url').type('url of blog')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      describe('and several blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'first blog', author:'Author 1', url: 'url 1' })
          cy.createBlog({ title: 'second blog', author:'Author 2', url: 'url 2' })
          cy.createBlog({ title: 'third blog', author:'Author 3', url: 'url 3' })
        })

        it('one of those can be liked', function () {
          cy.contains('second blog')
            .contains('view')
            .click()

          cy.contains('second blog')
            .contains('like')
            .click()

          cy.contains('second blog')
            .contains('1')
        })

        it('one of those can be removed by its creator', function () {
          cy.contains('third blog')
            .contains('view')
            .click()

          cy.contains('remove')
            .click()

          cy.get('html',{ timeout: 10000 }).should('not.contain', 'third blog')
        })

        it('a blog can be removed only by its creator', function () {
          cy.login({ username: 'guest', password: 'guest' })
          cy.contains('third blog')
            .contains('view')
            .click()

          cy.get('div').contains('third blog').should('not.contain','remove')
        })

        it('blogs are sorted by likes', function () {
          cy.contains('second blog')
            .contains('view')
            .click()

          cy.contains('second blog')
            .contains('like')
            .click()

          cy.get('div',{ timeout: 10000 }). contains('blog Author')
            .first()
            .should('contain.text', 'second blog')
            .next()
            .should('contain.text', 'first blog')
            .next()
            .should('contain.text', 'third blog')
        })
      })
    })
  })

})