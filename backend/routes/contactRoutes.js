const router = require('express').Router();
const { getAllMessages, sendMessage, deleteMessage } = require('../controllers/contactController');
const { authMiddleware, requireAdmin } = require('../middlewares/auth');


router.get('/messages', authMiddleware, requireAdmin, getAllMessages);
router.post('/send-message', sendMessage);
router.delete('/messages/:id', authMiddleware, requireAdmin, deleteMessage);




module.exports = router;