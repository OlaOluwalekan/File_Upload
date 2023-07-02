require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

// connect to db
const connect = require('./db/connect')

// products router
const productRouter = require('./route/productRoutes')

// error middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

// use v2 for cloudinary
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

app.get('/', (req, res) => {
  res.send('File Upload')
})

app.use('/api/v1/products', productRouter)

// use error middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 9000

const start = async () => {
  try {
    await connect(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
