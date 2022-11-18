const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

    try {
      const user = await User.signup({ firstName, lastName, email, username, password });

      const token = setTokenCookie(res, user);

      return res.json({
        id: user.id, firstName, lastName, email,token
      })
    } catch (error) {
      console.log(error)
      if (error.name === "SequelizeUniqueConstraintError") {
        for (const err of error.errors) {
          if (err.message === "email must be unique") {
            res.status(403)
            return res.json({
              "message": "User already exists",
              "statusCode": 403,
              "errors": {
                "email": "User with that email already exists"
              }
            })
          }
          if (err.message === "username must be unique") {
            res.status(403)
            return res.json({
              "message": "User already exists",
              "statusCode": 403,
              "errors": {
                "username": "User with that username already exists"
              }
            })
          }
        }

      }

      throw error
    }

  }
);




module.exports = router;
