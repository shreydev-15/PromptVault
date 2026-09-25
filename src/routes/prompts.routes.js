const express = require('express')
const promptController = require('../controllers/prompts.controllers')
const authMiddleware = require('../middlewares/auth.middlewares')
const jsonD = require('../controllers/json.controllers')

const router = express.Router()

router.get('/download/:id', authMiddleware.userAuth, jsonD.jsonDownload)

router.post('/create', authMiddleware.userAuth, promptController.createPrompt)
router.get('/getAll', authMiddleware.userAuth, promptController.getPrompts)
router.get('/getById/:id', authMiddleware.userAuth, promptController.getPromptById)
router.patch('/update/:id', authMiddleware.userAuth, promptController.updatePrompt)
router.delete('/delete/:id', authMiddleware.userAuth, promptController.deletePrompt)

module.exports = router