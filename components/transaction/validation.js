const Joi = require("joi");

const JoiSchema = Joi.object()
  .keys({})
  .unknown(true);

module.exports = JoiSchema;
