const router = require('express').Router();
const { getAllProjects, createProject, updateProject, deleteProject } = require('../controllers/projectsController');
const { authMiddleware, requireAdmin } = require('../middlewares/auth');



router.get('/', getAllProjects)

router.post('/', authMiddleware, requireAdmin, createProject)
router.put('/:id', authMiddleware, requireAdmin, updateProject)
router.delete('/:id', authMiddleware, requireAdmin, deleteProject)  






module.exports = router