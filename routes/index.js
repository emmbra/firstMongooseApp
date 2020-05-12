const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

// / prepended to every route
// Sets up /api route
router.use('/api', apiRoutes);

module.exports = router;
