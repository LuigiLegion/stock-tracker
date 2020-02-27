// Helper
const toDollars = cents => {
  const dollars = (cents / 100).toFixed(2)
  return dollars
}

// Exports
export default toDollars
