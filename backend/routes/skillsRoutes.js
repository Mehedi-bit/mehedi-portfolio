const router = require('express').Router();
const { authMiddleware, requireAdmin } = require('../middlewares/auth');
const { getAllSkills, updateSkills } = require('../controllers/skillsController');



router.get('/', getAllSkills)
router.put('/', authMiddleware, requireAdmin, updateSkills)





module.exports = router;