// Imports
const router = require('express').Router()

const {User, Portfolio, Transaction} = require('../db/models')

// Routes
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // Explicitly select only the id, googleId, firstName, lastName,
      // and email fields - even though users' passwords are encrypted,
      // it won't help if we just send everything to anyone who asks!
      attributes: ['id', 'googleId', 'firstName', 'lastName', 'email'],
      include: [
        {
          model: Portfolio,
          attributes: ['id', 'balance', 'value']
        },
        {
          model: Transaction,
          attributes: ['id', 'ticker', 'quantity', 'price']
        }
      ]
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      // Explicitly select only the id, googleId, firstName, lastName,
      // and email fields - even though users' passwords are encrypted,
      // it won't help if we just send everything to anyone who asks!
      attributes: ['id', 'googleId', 'firstName', 'lastName', 'email'],
      include: [
        {
          model: Portfolio,
          attributes: ['id', 'balance', 'value']
        },
        {
          model: Transaction,
          attributes: ['id', 'ticker', 'quantity', 'price']
        }
      ]
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
