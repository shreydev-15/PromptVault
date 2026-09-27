const ImageKit = require('imagekit')
require('dotenv').config()

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
  privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
  urlEndpoint: process.env.URL_ENDPOINT_IMAGEKIT
})

const sendFiles = async (file, fileName) => {
  if (!file) {
    throw new Error('No file provided')
  }

  const result = await imagekit.upload({
    file,
    fileName,
    folder: '/users',
    useUniqueFileName: true
  })

  return result
}

module.exports = sendFiles