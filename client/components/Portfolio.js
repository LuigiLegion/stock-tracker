// Imports
import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import SingleStock from './SingleStock'
import Spacer from './Spacer'
import {getPortfolioThunkCreator} from '../store/portfolioReducer'

// Component
const Portfolio = ({
  balance,
  value,
  stocks,
  getPortfolioThunk,
  handleSubmit
}) => {
  const balanceInDollars = (balance / 100).toFixed(2)
  const valueInDollars = (value / 100).toFixed(2)

  useEffect(
    () => {
      getPortfolioThunk()
    },
    [getPortfolioThunk]
  )

  return (
    <div className="center">
      <h1 className="left">{`Portfolio ($ ${valueInDollars})`}</h1>

      <div className="portfolio-row-container">
        <div className="portfolio-row-stocks-containee portfolio-column-container">
          {stocks.length &&
            stocks.map((curStock, idx) => (
              <Fragment key={curStock.ticker}>
                <SingleStock stock={curStock} />

                {idx < stocks.length - 1 && <Spacer type="horizontal" />}
              </Fragment>
            ))}
        </div>

        <Spacer type="vertical" />

        <div className="portfolio-row-balance-containee portfolio-column-container">
          <div className="portfolio-column-containee">
            <span className="text-style-bold">Cash: </span>$ {balanceInDollars}
          </div>

          <div className="portfolio-column-containee">
            <form className="form-container center" onSubmit={handleSubmit}>
              <div className="form-containee">
                <label htmlFor="ticker">
                  <small>Ticker</small>
                </label>

                <input name="ticker" autoComplete="ticker" type="text" />
              </div>

              <div className="form-containee">
                <label htmlFor="quantity">
                  <small>Quantity</small>
                </label>

                <input name="quantity" autoComplete="quantity" type="number" />
              </div>

              <div>
                <span className="text-style-bold">Total: </span>$ 0.00
              </div>

              <div className="form-containee">
                <button type="submit">Buy</button>
              </div>

              {/* Insert Error Handling Here */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// Container
const mapStateToProps = state => {
  return {
    balance: state.portfolio.balance,
    value: state.portfolio.value,
    stocks: state.portfolio.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolioThunk() {
      dispatch(getPortfolioThunkCreator())
    },
    handleSubmit(event) {
      event.preventDefault()

      const ticker = event.target.ticker.value
      const quantity = event.target.quantity.value

      if (ticker && quantity) {
        console.log(`Bought ${quantity} ${ticker} stocks successfully`)
      } else {
        console.error('Error! Invalid ticker and/or quantity.')
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)

// Prop Types
Portfolio.propTypes = {
  balance: PropTypes.number,
  value: PropTypes.number,
  stocks: PropTypes.array,
  getPortfolioThunk: PropTypes.func,
  handleSubmit: PropTypes.func
}
