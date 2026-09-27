const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/doc', 'application/msword', 'text/plain']

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
      return
    }

    cb(new Error('Unsupported file type'))
  }
})

module.exports = upload

