const router = require('express').Router();
const { signUp } = require('./../../../controllers/authController');

// Route: api/auth

// since only doing a post request, no need for router.route
// api/auth/signup
router.post('/signup', signUp);

module.exports = router;
