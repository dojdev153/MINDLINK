const router = require('express').Router();
const { join, getCount, notifyAll } = require('../controllers/waitlist.controller');
const authMiddleware = require('../middleware/auth');
const { validateWaitlist } = require('../middleware/validate');

router.post('/join', validateWaitlist, join);
router.get('/count', getCount);
router.post('/notify', authMiddleware, notifyAll); // admin-only trigger

module.exports = router;
