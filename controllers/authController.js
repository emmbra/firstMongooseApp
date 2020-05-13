const { isEmail, isLength } = require('validator');
const jwt = require('jwt-simple'); // library to create token for user
const { User } = require('./../models');
const { secret } = require('./../config');


function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  // jwt.encode takes 2 params
  // 1 is what you want token to look like and values for each field
  // 2 is the secret you want to use to encode the token
  // sub: who does this token belong to
  return jwt.encode({ sub: user._id, iat: timeStamp }, secret);
}

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ error: 'You must provide both email and password!' })
    }
    if(!isEmail(email)) {
      return res.status(400).json({ error: 'You must provide a valid email address!' })
    }
    if(!isLength(password, { min: 6 })) {
      return res.status(400).json({ error: 'Your password must be at least 6 characters long!' })
    }
    try {
      const existingUser = await User.findOne({ email });
      if(existingUser) { 
        return res.status(401).json({ error: 'User email already exists!' });
      }
      // user signs up and logs in, info saved to db
      const user = await new User({ email, password }).save();
      // return a token to user based on userId and timeStamp
      return res.status(200).json({ token: tokenForUser(user) });
    } catch (error) {
      return res.status(403).json(error);
    }
  },
  signIn: (req, res) => res.status(200).json({ token: tokenForUser(req.user) })

};
