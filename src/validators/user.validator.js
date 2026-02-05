const Joi = require('joi');

exports.createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
});

exports.updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email()
});
