const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  image: {
    type: String,
    required: [true, 'image is required'],
  },
})

module.exports = model('Product', ProductSchema)
