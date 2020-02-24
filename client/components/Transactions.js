// Imports
import React from 'react'

import Spacer from './Spacer'

// Component
const Transactions = () => {
  return (
    <div className="center">
      <h1 className="left">Transactions</h1>

      <div className="transactions-column-container">
        <div className="transactions-column-containee">
          BUY (AAPL) - 6 Shares @ $300.00/Share
        </div>

        <Spacer type="horizontal" />

        <div className="transactions-column-containee">
          BUY (STWD) - 40 Shares @ $20.56/Share
        </div>

        <Spacer type="horizontal" />

        <div className="transactions-column-containee">
          BUY (NFLX) - 86 @ $300.00/Share
        </div>

        <Spacer type="horizontal" />

        <div className="transactions-column-containee">
          BUY (MSFT) - 10 Shares @ $20.56/Share
        </div>

        <Spacer type="horizontal" />

        <div className="transactions-column-containee">
          BUY (ATT) - 5 Shares @ $300.00/Share
        </div>
      </div>
    </div>
  )
}

export default Transactions
