const { StatusCodes } = require('http-status-codes')
const path = require('path')
const { BadRequestError } = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const UploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No image uploaded')
  }

  let productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('accepted file type is image')
  }

  const maxSize = 1000
  if (productImage.size > maxSize) {
    throw new BadRequestError('File too large. max file size is 1kB')
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )

  await productImage.mv(imagePath)
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

const UploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file_upload_tutorial',
    }
  )
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = UploadProductImage
