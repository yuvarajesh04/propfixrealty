const express = require('express')
const router = express.Router()
const uploads = require('../middleware/uploadMiddleware')
const auth = require('../middleware/authMiddleware')
const { createProject, getAllProjects, deleteProject } = require('../controllers/projectController')

router.post('/create-project', auth, uploads.array('images'), createProject)
router.get('/get-all', auth, getAllProjects)
router.delete('/delete/:id', auth, deleteProject)

module.exports = router