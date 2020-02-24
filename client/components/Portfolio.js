// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Spacer from './Spacer'

// Component
const Portfolio = ({balance}) => {
  const balanceInDollars = (balance / 100).toFixed(2)

  return (
    <div className="center">
      <h1 className="left">Portfolio (TOTAL STOCK VALUE IN $)</h1>

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
            <span className="text-style-bold">Cash: </span>${balanceInDollars}
          </div>

          <div className="portfolio-column-containee">
            <form
              className="form-container center"
              name={name}
              // onSubmit={handleSubmit}
            >
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
                <span className="text-style-bold">Total: </span>$0
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
    balance: state.user.balance
  }
}

export default connect(mapStateToProps)(Portfolio)

// Prop Types
Portfolio.propTypes = {
  balance: PropTypes.number
}
