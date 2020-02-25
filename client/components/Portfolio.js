// Imports
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Spacer from './Spacer'
import {getPortfolioThunkCreator} from '../store/portfolioReducer'

// Component
const Portfolio = ({balance, value, getPortfolioThunk, handleSubmit}) => {
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
          <div className="portfolio-column-containee portfolio-row-container">
            <div className="portfolio-column-stock-containee">
              AAPL - 6 Shares
            </div>
            <div className="portfolio-column-price-containee">$2043.09</div>
          </div>

          <Spacer type="horizontal" />

          <div className="portfolio-column-containee portfolio-row-container">
            <div className="portfolio-column-stock-containee">
              STWD - 40 Shares
            </div>
            <div className="portfolio-column-price-containee">$2043.09</div>
          </div>

          <Spacer type="horizontal" />

          <div className="portfolio-column-containee portfolio-row-container">
            <div className="portfolio-column-stock-containee">
              NFLX - 86 Shares
            </div>
            <div className="portfolio-column-price-containee">$2043.09</div>
          </div>

          <Spacer type="horizontal" />

          <div className="portfolio-column-containee portfolio-row-container">
            <div className="portfolio-column-stock-containee">
              MSFT - 10 Shares
            </div>
            <div className="portfolio-column-price-containee">$2043.09</div>
          </div>

          <Spacer type="horizontal" />

          <div className="portfolio-column-containee portfolio-row-container">
            <div className="portfolio-column-stock-containee">
              ATT - 5 Shares
            </div>
            <div className="portfolio-column-price-containee">$2043.09</div>
          </div>
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
    value: state.portfolio.value
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
  getPortfolioThunk: PropTypes.func,
  handleSubmit: PropTypes.func
}
