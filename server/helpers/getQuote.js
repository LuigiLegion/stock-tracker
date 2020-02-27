// Imports
const iexCloudApi = require('iexcloud_api_wrapper')

// Helper
const getQuote = async ticker => {
  try {
    const data = await iexCloudApi.quote(ticker)
    return data
  } catch (error) {
    return error.response.data
  }
}

// Exports
module.exports = getQuote
