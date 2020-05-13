const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

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

// Let's passport know that we have declared a jwt strategy
// if we call passport.authenticate('jwt'), passport will refer
// to this jwtLogin strategy that we defined
passport.use(jwtLogin)


