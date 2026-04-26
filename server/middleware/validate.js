const joi = require('joi');

const signupSchema = joi.object({
  full_name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

const waitlistSchema = joi.object({
  full_name: joi.string().required(),
  email: joi.string().email().required(),
  age_group: joi.string().allow('', null),
  location: joi.string().allow('', null)
});

const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const validateWaitlist = (req, res, next) => {
  const { error } = waitlistSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = { validateSignup, validateLogin, validateWaitlist };
