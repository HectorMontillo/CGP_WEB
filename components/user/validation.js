const Joi = require("joi");

const JoiSchema = Joi.object().keys({
  fullname: Joi.string()
    .regex(/^[a-zA-Z]+\s?([a-zA-Z]+\s?)+$/)
    .min(3)
    .required(),
  doc: Joi.string()
    .regex(/^[0-9]+$/)
    .min(7)
    .max(11)
    .required(),
  email: Joi.string()
    .email()
    .lowercase()
    .required(),
  password: Joi.string()
    .alphanum()
    .min(6)
    .required(),
  cel: Joi.number().min(10)
});

module.exports = JoiSchema;
