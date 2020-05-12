const router = require('express').Router();
const { signUp } = require('./../../../controllers/authController');

// since only doing a post request, no need for router.route
router.post('/signup', signUp);

module.exports = router;
