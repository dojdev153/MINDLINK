const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { signup, login, refresh, getMe } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');
const { validateSignup, validateLogin } = require('../middleware/validate');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: { error: 'Too many login attempts, please try again later.' }
});

router.post('/signup', validateSignup, signup);
router.post('/login', loginLimiter, validateLogin, login);
router.post('/refresh', refresh);
router.get('/me', authMiddleware, getMe);

module.exports = router;
