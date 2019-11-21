const Joi = require("joi");

const JoiSchema = Joi.object()
  .keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(12)
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
              err.message = "Dale un nombre al grupo!!";
              break;
            case "string.alphanum":
              err.message = "El nombre del grupo es inválido!!";
              break;
            case "string.min":
              err.message = `El nombre del grupo debe contener por lo menos ${err.context.limit} caracteres!`;
              break;
            case "string.max":
              err.message = `El nombre del grupo no debe contener más de ${err.context.limit} caracteres!`;
              break;
            default:
              err.message = "Oh oh, creo que tenemos problemas!!";
              break;
          }
        });
        return errors;
      })
  })
  .unknown(true);

module.exports = JoiSchema;
