const { getSettings, updateAdmin, updateHero, updateAbout, getAbout, updateFooter, updateContactPitch } = require('../controllers/settingsController');
const { requireAdmin, authMiddleware } = require('../middlewares/auth');

const router = require('express').Router();




router.get('/',  getSettings)
router.get('/about', getAbout)

router.put('/admin', authMiddleware, requireAdmin, updateAdmin)
router.put('/hero', authMiddleware, requireAdmin, updateHero)
router.put('/about', authMiddleware, requireAdmin, updateAbout)
router.put('/footer', authMiddleware, requireAdmin, updateFooter)
router.put('/contactpitch', authMiddleware, requireAdmin, updateContactPitch)






module.exports = router;