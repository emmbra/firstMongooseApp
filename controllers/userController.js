const { Todo, User } = require('./../models');



module.exports = { 
  addTodo: async (req, res) => {
    const { text, userId } = req.body;
    if(!text) {
      return res.status(400).json({ error: 'You must provide text for the todo!'});
    }
    try {
      // save the todo text and id to Todo collection
      const newTodo = await new Todo({ text, user: userId }).save();
      const user = await User.findById(userId);
      user.todos.push(newTodo);
      // save the todo id to User collection
      await user.save();
      return res.status(200).json(newTodo);
    } catch (error) {
      return res.status(403).json(error);
    }
  },

  getAllUserEmails: async (req, res) => {
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

};