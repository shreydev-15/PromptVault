const express = require('express')
const promptController = require('../controllers/prompts.controllers')
const authMiddleware = require('../middlewares/auth.middlewares')
const router = express.Router()

router.post('/create', authMiddleware.userAuth, promptController.createPrompt)
router.get('/getAll', authMiddleware.userAuth, promptController.getPrompts)
router.get('/getById', authMiddleware.userAuth, promptController.getPromptById)
router.patch('/update', authMiddleware.userAuth, promptController.updatePrompt)
router.delete('/delete', authMiddleware.userAuth, promptController.deletePrompt)

module.exports = router