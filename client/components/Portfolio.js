// Imports
import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import SingleStock from './SingleStock'
import Spacer from './Spacer'
import BuyForm from './BuyForm'
import {getPortfolioThunkCreator} from '../store/portfolioReducer'

// Component
const Portfolio = ({balance, value, stocks, getPortfolioThunk}) => {
  useEffect(
    () => {
      getPortfolioThunk()
    },
    [getPortfolioThunk]
  )

  const balanceInDollars = (balance / 100).toFixed(2)
  const valueInDollars = (value / 100).toFixed(2)

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

          <BuyForm />
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)

// Prop Types
Portfolio.propTypes = {
  balance: PropTypes.number,
  value: PropTypes.number,
  stocks: PropTypes.array,
  getPortfolioThunk: PropTypes.func
}
