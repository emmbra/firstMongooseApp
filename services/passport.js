const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require('passport-local');
const { User } = require('./../models');
const { secret } = require("./../config");

// Setup options for jwt
const jwtOptions = {
  // tells jwt where to pull token from
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secret,
};

// create jwt strategy for handling jwt
// this strategy is for authenticating users on each request
// payload is token info
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // payload === { sub: user._id, iat: timeStamp }
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    // done will attach the authenticated user to req.user for next request
    return done(null, user);
  } catch (error) {
    return done(error, false)
  }
});

// By default, LocalStrategy is looking for a username
// However, we are not using username -- we are using email
// So here I am saying, "Hey, if you're looking for username
// look for email property from the request instead (req.body.email)"
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false);
    }
    // this is an instance of user
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

// Lets passport know that we have declared a jwt strategy
// if we call passport.authenticate('jwt'), passport will refer
// to this jwtLogin strategy that we defined
passport.use(jwtLogin);


// lets passport know that we have declared a local strategy
// if we call passport.authenticate('local'), passport will refer
// to this localLogin strategy that we defined
passport.use(localLogin);

