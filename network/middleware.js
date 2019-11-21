const Joi = require("joi");
const response = require("./response");

const joiValidation = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(",");
      response.error(req, res, message, 422, message);
    }
  };
};
module.exports = joiValidation;
