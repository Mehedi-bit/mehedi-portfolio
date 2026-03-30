const router = require('express').Router();
const { authMiddleware, requireAdmin } = require('../middlewares/auth');
const { getAllProjectRequests, createProjectRequest, deleteProjectRequest } = require('../controllers/projectRequestController');


router.get('/', authMiddleware, requireAdmin, getAllProjectRequests);
router.post('/', createProjectRequest);
router.delete('/:id', authMiddleware, requireAdmin, deleteProjectRequest);






module.exports = router;