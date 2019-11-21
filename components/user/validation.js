const Joi = require("joi");

const JoiSchema = Joi.object().keys({
  fullname: Joi.string()
    .regex(/^[a-zA-Z]+\s?([a-zA-Z]+\s?)+$/)
    .min(3)
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "Agrega tu nombre completo!!";
            break;
          case "string.regex.base":
            err.message = "Tu nombre completo es inválido!!";
            break;
          case "string.min":
            err.message = `Tu nombre completo debe contener por lo menos ${err.context.limit} caracteres!`;
            break;
          default:
            err.message = "Oh oh, prueba de otra manera!!";
            break;
        }
      });
      return errors;
    }),
  doc: Joi.string()
    .regex(/^[0-9]+$/)
    .min(7)
    .max(11)
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "Agrega tu cédula!!";
            break;
          case "string.regex.base":
            err.message = "Tu cédula es inválida!!";
            break;
          case "string.min":
            err.message = `Tu cédula debe contener por lo menos ${err.context.limit} caracteres!`;
            break;
          case "string.max":
            err.message = `Tu cédula no debe contener más de ${err.context.limit} caracteres!`;
            break;
          default:
            err.message = "Oh oh, prueba de otra manera!!";
            break;
        }
      });
      return errors;
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "Agrega tu e-mail!!";
            break;
          case "string.email":
            err.message = "Tu e-mail es inválido!!";
            break;
          default:
            err.message = "Oh oh, prueba de otra manera!!";
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#\$%\^&\*\+])/)
    .min(6)
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "Agrega una contraseña!!";
            break;
          case "string.regex.base":
            err.message =
              "Tu contraseña debe incluir por lo menos una minúscula, una mayúscula, un número y un caracter especial!!";
            break;
          case "string.min":
            err.message = `Tu contraseña debe contener por lo menos ${err.context.limit} caracteres!!`;
            break;
          default:
            err.message = "Oh oh, prueba de otra manera!!";
            break;
        }
      });
      return errors;
    }),
  cel: Joi.number().min(10)
});

module.exports = JoiSchema;
