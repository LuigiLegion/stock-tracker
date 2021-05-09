// Imports
const User = require('./user')
const Portfolio = require('./portfolio')
const Transaction = require('./transaction')

// Associations
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 **/

User.hasOne(Portfolio)
Portfolio.belongsTo(User)

User.hasMany(Transaction)
Transaction.belongsTo(User)

Portfolio.hasMany(Transaction)
Transaction.belongsTo(Portfolio)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 **/

// Exports
module.exports = {
  User,
  Portfolio,
  Transaction
}
