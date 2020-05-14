const { Todo, User } = require('./../models');



module.exports = { 
  addTodo: async (req, res) => {
    // console.log("I am the logged in user", req.user)
    const { text } = req.body;
    if(!text) {
      return res.status(400).json({ error: 'You must provide text for the todo!'});
    }
    try {
      // save the todo text and id to Todo collection
      const newTodo = await new Todo({ text, user: req.user._id }).save();
      req.user.todos.push(newTodo);
      // save the todo id to User collection
      await req.user.save();
      console.log("Saved", req.user)
      return res.status(200).json(newTodo);
    } catch (error) {
      return res.status(403).json(error);
    }
  },

  getAllUserEmails: async (req, res) => {
    // console.log(req.user); // should be same user passed to done on passport.js
    // req.user only exists because of requireAuth middleware on user route
    try {
      // {} means find everything
      // 2nd parameter denotes what you want to see: 'email'
      const users = await User.find({}, 'email');
      if (!users) {
        return res.status(404).json({ error: 'No user found' });
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(403).json(error);
    }
  },

  getUserTodos: async (req, res) => {
    console.log(req.user);
    try {
      // method #1, query User collection
      // const user = await User.findById(req.user._id).populate('todos');
      // return res.status(200).json(user.todos);
      // method #2, query Todo collection
      const todos = await Todo.find({ user: req.user._id });
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(403).json(error);
    }
  }
};