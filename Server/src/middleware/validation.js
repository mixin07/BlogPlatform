const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('regNo').trim().isLength({ min: 5, max: 20 }).withMessage('Registration number must be 5-20 characters'),
  body('year').trim().isIn(['1st', '2nd', '3rd', '4th']).withMessage('Valid year required'),
  body('domain').trim().isLength({ min: 2, max: 50 }).withMessage('Domain must be 2-50 characters'),
  handleValidationErrors
];

// Password setting validation
const validatePassword = [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  handleValidationErrors
];

// Blog validation
const validateBlog = [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  body('content').trim().isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),
  body('links').optional().isArray().withMessage('Links must be an array'),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validatePassword,
  validateLogin,
  validateBlog,
  handleValidationErrors
};
