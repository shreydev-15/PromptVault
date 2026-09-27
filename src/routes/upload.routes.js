const express = require('express')
const multer = require('multer')
const sendFiles = require('../config/imagekit')
const { userAuth } = require('../middlewares/auth.middlewares')

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
      return
    }

    cb(new Error('Unsupported file type'))
  }
})

router.post('/upload', userAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded'
      })
    }

    const result = await sendFiles(req.file.buffer, req.file.originalname)

    return res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        url: result.url,
        fileId: result.fileId,
        name: result.name,
        size: result.size,
        type: result.type,
        thumbnailUrl: result.thumbnailUrl
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Image upload failed',
      error: error.message
    })
  }
})

module.exports = router
