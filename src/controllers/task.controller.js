const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, priority, status } = req.body;
    const task = await Task.create({
      title,
      description,
      priority,
      status,
      userId: req.user.id
    });

    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, sortBy = 'createdAt', order = 'desc' } = req.query;

    const filter = { userId: req.user.id };
    
if (status) filter.status = status;
if (priority) filter.priority = priority;

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const skip = (page - 1) * limit;
    const [total, tasks] = await Promise.all([
      Task.countDocuments(filter),
      Task.find(filter).sort(sortObj).skip(skip).limit(Number(limit))
    ]);

    return res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
      data: tasks
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const payload = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found or not authorized' });
    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found or not authorized' });
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
