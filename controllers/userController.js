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
  }

};