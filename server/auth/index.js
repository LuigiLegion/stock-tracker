// Imports
const router = require('express').Router()

const {User, Portfolio} = require('../db/models')

// Middleware
router.use('/google', require('./google'))

// Routes
router.get('/me', (req, res) => {
  res.json(req.user)
})

router.post('/signup', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body
    const user = await User.create({firstName, lastName, email, password})
    const portfolio = await Portfolio.create({userId: user.id})
    req.login(user, error => (error ? next(error) : res.json(user)))
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(error)
    }
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, error => (error ? next(error) : res.json(user)))
    }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// Exports
module.exports = router
