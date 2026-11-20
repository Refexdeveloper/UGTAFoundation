const router = require('express').Router();
const authController = require('../controllers/auth');
const auth = require('../middlewares/auth');

router.post('/login', authController.login);
router.get('/verify', auth.authCheck, authController.verify);
router.post('/logout', auth.authCheck, authController.logout);

module.exports = router;
