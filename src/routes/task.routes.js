const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const {
  createTaskValidator,
  updateTaskValidator,
  getTasksValidator
} = require('../validators/task.validator');

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');

const { validationResult } = require('express-validator');


const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.use(protect);

router.post('/', createTaskValidator, runValidation, createTask);
router.get('/', getTasksValidator, runValidation, getTasks);
router.get('/:id', updateTaskValidator, runValidation, getTask);
router.put('/:id', updateTaskValidator, runValidation, updateTask);
router.delete('/:id', updateTaskValidator, runValidation, deleteTask);

module.exports = router;
