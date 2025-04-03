const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Task title is required'], 
      trim: true, 
      minlength: [3, 'Title must be at least 3 characters long']
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'], 
      trim: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'completed'], 
      default: 'pending' 
    },
    dueDate: { 
      type: Date, 
      required: [true, 'Due date is required'] 
    }
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
