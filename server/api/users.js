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
          separate: true,
          order: [['createdAt', 'DESC']],
          attributes: ['id', 'ticker', 'quantity', 'price', 'createdAt']
        }
      ]
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params

  try {
    const user = await User.findByPk(userId, {
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
          separate: true,
          order: [['createdAt', 'DESC']],
          attributes: ['id', 'ticker', 'quantity', 'price', 'createdAt']
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
