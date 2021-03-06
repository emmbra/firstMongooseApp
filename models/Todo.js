const { Schema, model } = require('mongoose');

const TodoSchema = new Schema ({
  text: {
    type: String,
    required: [true, 'You must provide text for the todo!']
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Todo', TodoSchema)
