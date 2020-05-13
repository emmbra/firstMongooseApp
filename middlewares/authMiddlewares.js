const passport = require('passport');

// tells passport to look for 'jwt' strategy that we defined
// session: false because jwt uses cookies by default, but we're using tokens
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = {
  requireAuth,
};
