'use strict'

// Imports
const {red, green} = require('chalk')

const db = require('../server/db')

// Models
const {User, Portfolio, Transaction} = require('../server/db/models')

// Initializations
async function seed() {
  await db.sync({force: true})
  console.log('Database is synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'DaPug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'DaPug',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const portfolios = await Promise.all([
    Portfolio.create({
      userId: 2
    }),
    Portfolio.create({
      userId: 1
    })
  ])

  const transactions = await Promise.all([
    Transaction.create({
      userId: 1,
      portfolioId: 1,
      ticker: 'AAPL',
      quantity: 6,
      price: 30000
    }),
    Transaction.create({
      userId: 1,
      portfolioId: 1,
      ticker: 'STWD',
      quantity: 40,
      price: 2056
    }),
    Transaction.create({
      userId: 1,
      portfolioId: 1,
      ticker: 'AAPL',
      quantity: 6,
      price: 30000
    }),
    Transaction.create({
      userId: 1,
      portfolioId: 1,
      ticker: 'STWD',
      quantity: 40,
      price: 2056
    }),
    Transaction.create({
      userId: 1,
      portfolioId: 1,
      ticker: 'AAPL',
      quantity: 6,
      price: 30000
    }),
    Transaction.create({
      userId: 2,
      portfolioId: 2,
      ticker: 'AAPL',
      quantity: 6,
      price: 30000
    }),
    Transaction.create({
      userId: 2,
      portfolioId: 2,
      ticker: 'STWD',
      quantity: 40,
      price: 2056
    }),
    Transaction.create({
      userId: 2,
      portfolioId: 2,
      ticker: 'AAPL',
      quantity: 6,
      price: 30000
    }),
    Transaction.create({
      userId: 2,
      portfolioId: 2,
      ticker: 'STWD',
      quantity: 40,
      price: 2056
    }),
    Transaction.create({
      userId: 2,
      portfolioId: 2,
      ticker: 'AAPL',
      quantity: 6,
      price: 30000
    })
  ])

  console.log(`Seeded ${users.length} Users`)
  console.log(`Seeded ${portfolios.length} Portfolios`)
  console.log(`Seeded ${transactions.length} Transactions`)
  console.log(green('Seeded database successfully'))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('Seeding...')
  try {
    await seed()
  } catch (error) {
    console.error(red('Oh no! Something went wrong!'))
    console.error(error)
    process.exitCode = 1
  } finally {
    console.log('Closing database connection...')
    await db.close()
    console.log('Database connection is closed!')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// Exports
// We export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
