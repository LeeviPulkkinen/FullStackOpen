describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Leevi pulkkinen',
      username: 'leevi',
      password: 'pass'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get("#username").type("leevi")
      cy.get("#password").type("pass")

      cy.get("#submit_login").click()

      cy.contains("Leevi pulkkinen logged in")

    })

    it('fails with wrong credentials', function () {
      cy.get("#username").type("markus")
      cy.get("#password").type("hackerman")

      cy.get("#submit_login").click()

      cy.contains("Invalid username or password")
    })
  })

  describe('When logged in', function () {
    const login = {
      username: 'leevi',
      password: 'pass'
    }
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', login).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function () {
      cy.get("#new_blog").click()

      cy.get("#title").type("test title")
      cy.get("#author").type("test author")
      cy.get("#url").type("test url")

      cy.get("#submit_blog").click()

      cy.contains("New blog test title by test author")
      cy.contains("test title test author")
    })

    it('A blog can be liked', function () {
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {
          title: 'test title',
          author: 'test author',
          url: 'test url',
          likes: 0
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
        }
      })

      cy.visit('http://localhost:5173')

      cy.contains("view").click()

      cy.contains("Like").click()

      cy.contains("Likes 1")
    })

    it('A blog can be deleted', function () {
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {
          title: 'test title',
          author: 'test author',
          url: 'test url',
          likes: 0
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
        }
      })

      cy.visit('http://localhost:5173')

      cy.contains("view").click()

      cy.contains("Remove").click()

      cy.get('html').should('not.contain', 'test title test author')
    })

    it('A blog can be deleted only by creator', function () {
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {
          title: 'test title',
          author: 'test author',
          url: 'test url',
          likes: 0
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
        }
      })

      cy.contains("Logout").click()

      localStorage.clear()

      const user = {
        name: 'Leevi pulkkinen2',
        username: 'leevi2',
        password: 'pass2'
      }

      cy.request('POST', 'http://localhost:3003/api/users', user)

      const login = {
        username: 'leevi2',
        password: 'pass2'
      }

      cy.request('POST', 'http://localhost:3003/api/login', login).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })

      cy.contains("view").click()

      cy.get('html').should('not.contain', 'Remove')
      cy.contains('test title test author')
    })

    it('Blogs are ordered by likes', function () {
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {
          title: 'test title',
          author: 'test author',
          url: 'test url',
          likes: 1
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
        }
      })

      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {
          title: 'most liked title',
          author: 'most liked author',
          url: 'test url',
          likes: 5
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
        }
      })

      cy.visit('http://localhost:5173')

      cy.get(".blog").eq(0).contains("most liked title most liked author")
      cy.get(".blog").eq(1).contains("test title test author")
    })
  })
})