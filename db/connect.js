const mongoose = require('mongoose')

const connectDB = (uri) => {
  return mongoose.connect(uri, console.log('connected to database'))
}

module.exports = connectDB
