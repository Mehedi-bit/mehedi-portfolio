const router = require('express').Router();
const { getStats, updateStats } = require('../controllers/statsController');
const { authMiddleware, requireAdmin } = require('../middlewares/auth');



router.get('/', getStats)
router.put('/', authMiddleware, requireAdmin, updateStats)





module.exports = router;