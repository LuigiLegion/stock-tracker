// Imports
import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {BuyForm, Stock, Spacer} from '../index'
import {getPortfolioThunkCreator} from '../store/portfolioReducer'
import {dollars} from '../utils'

// Component
const Portfolio = ({balance, value, stocks, getPortfolioThunk}) => {
  useEffect(
    () => {
      getPortfolioThunk()

      const intervalId = setInterval(() => getPortfolioThunk(), 20000)

      return () => {
        clearInterval(intervalId)
      }
    },
    [getPortfolioThunk]
  )

  const balanceInDollars = dollars(balance)
  const valueInDollars = dollars(value)

  return (
    <div className="center">
      <h4 className="left">{`Portfolio (Value: $ ${valueInDollars})`}</h4>

      <div className="portfolio-row-container">
        <div className="portfolio-row-stocks-containee portfolio-column-container">
          {stocks.length ? (
            stocks.map((curStock, idx) => (
              <Fragment key={curStock.ticker}>
                <Stock stock={curStock} />

                {idx < stocks.length - 1 && <Spacer type="horizontal" />}
              </Fragment>
            ))
          ) : (
            <Fragment>
              <div>No stocks were found.</div>

              <div>Buy a stock to populate this section.</div>
            </Fragment>
          )}
        </div>

        <Spacer type="vertical" />

        <div className="portfolio-row-balance-containee portfolio-column-container">
          <div className="portfolio-column-containee cash-details">
            <span className="text-style-bold">Cash: </span>

            <span>$ {balanceInDollars}</span>
          </div>

          <BuyForm />
        </div>
      </div>
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  balance: state.portfolio.balance,
  value: state.portfolio.value,
  stocks: state.portfolio.stocks
})

const mapDispatchToProps = dispatch => ({
  getPortfolioThunk() {
    dispatch(getPortfolioThunkCreator())
  }
})

// Prop Types
Portfolio.propTypes = {
  balance: PropTypes.number,
  value: PropTypes.number,
  stocks: PropTypes.array,
  getPortfolioThunk: PropTypes.func
}

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
