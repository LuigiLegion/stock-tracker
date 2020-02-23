/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const app = require('../index')
const db = require('../db')

const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysFirstName = 'Cody'
    const codysLastName = 'DaPug'
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: codysFirstName,
        lastName: codysLastName,
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // End describe('/api/users')
}) // End describe('User routes')
