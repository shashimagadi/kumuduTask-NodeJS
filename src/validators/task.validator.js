const { body, param, query } = require('express-validator');

exports.createTaskValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('priority').optional().isIn(['Low','Medium','High']).withMessage('Invalid priority'),
  body('status').optional().isIn(['Pending','In Progress','Done']).withMessage('Invalid status'),
];

exports.updateTaskValidator = [
  param('id').isMongoId().withMessage('Invalid task id'),
  body('title').optional().trim(),
  body('priority').optional().isIn(['Low','Medium','High']),
  body('status').optional().isIn(['Pending','In Progress','Done']),
];

exports.getTasksValidator = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('status').optional().isIn(['Pending','In Progress','Done']),
  query('priority').optional().isIn(['Low','Medium','High']),
  query('sortBy').optional().isIn(['priority','createdAt']),
  query('order').optional().isIn(['asc','desc'])
];
