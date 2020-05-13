const { Schema, model } = require("mongoose");
// destructure properties from validator
const { isEmail, isLength } = require("validator");
// bcrypt.compare vs compare b/c it's destructured
const { compare, genSalt, hash } = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address!"],
    required: [true, "You must provide an email address!"],
  },
  password: {
    type: String,
    required: [true, "You must provide a password!"],
    validate: [
      (value) => isLength(value, { min: 6 }),
      "Your password must be at least 6 characters long!",
    ],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  // not saving actual todos, only the ids
  // each id references todo model
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;
  try {
    const isMatch = await compare(candidatePassword, user.password);
    return Promise.resolve(isMatch);
  } catch (error) {
    return Promise.reject(error);
  }
}

UserSchema.pre('save', async function(next) {
  const user = this;
  // isModified defaults to true when you create something new
  // every call after that will be false
  if (user.isModified('password')) {
    try {
      const salt = await genSalt();
      const hashedPassword = await hash(user.password, salt);
      user.password = hashedPassword;
    } catch (error) {
      next(error);
    }
  }
  // Finally call save
  next();
});

module.exports = model("User", UserSchema);
