const Joi = require("joi");

const JoiSchema = Joi.object()
  .keys({
    name: Joi.string()
      .regex(/^[a-zA-Z]+\s?([a-zA-Z]+\s?)+$/)
      .min(3)
      .max(12)
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
              err.message = "Dale un nombre a tu cuenta!!";
              break;
            case "string.regex.base":
              err.message = "El nombre de tu cuenta es inválido!!";
              break;
            case "string.min":
              err.message = `El nombre de tu cuenta debe contener por lo menos ${err.context.limit} caracteres!`;
              break;
            case "string.max":
              err.message = `El nombre de tu cuenta no debe contener más de ${err.context.limit} caracteres!`;
              break;
            default:
              err.message = "Oh oh, creo que tenemos problemas!!";
              break;
          }
        });
        return errors;
      }),

    accountNumber: Joi.number().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "El numero de cuenta debe ser un string!!";
            break;
          case "string.creditCard":
            err.message = "El numero de cuenta es incorrecto";
            break;
          default:
            err.message = "Oh oh, hay algo mal con el numero de tu cuenta";
            break;
        }
      });
    }),
    notes: Joi.string().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
            err.message = "Las notas deben ser un string!!";
            break;
          case "string.max":
            err.message = `Las notas de tu cuenta no deben contener más de ${err.context.limit} caracteres!`;
            break;
          default:
            err.message = "Oh oh, hay algo mal con las notas";
            break;
        }
      });
    }),
    accountType: Joi.string()
      //.regex(/^(Ahorros|Efectivo|Inversion|Tarjeta\sde\scredito|Prestamo)$/)
      .required()
      .error(errors => {
        errors.forEach(err => {
          console.log("tipo de error" + err.type);
          switch (err.type) {
            case "any.empty":
              err.message = "El tipo de cuenta debe ser un string!!";
              break;
            case "string.regex.base":
              err.message = "El tipo de cuenta ingresado es inválido!!";
              break;
            default:
              err.message = "Oh oh, hay algo mal con el tipo de cuenta";
              break;
          }
        });
      }),
    savingAccount: Joi.object().keys({
      balance: Joi.number()
        .min(-999999999)
        .max(999999999)
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Pon dinero en tu cuenta!!";
                break;
              case "number.max":
                err.message = `Tu cuenta no debe contener más de ${err.context.limit} $`;
                break;
              case "number.min":
                err.message = `Tu cuenta no debe menos de ${err.context.limit} $`;
                break;
              default:
                err.message = "Oh oh, hay algo mal con el balance de tu cuenta";
                break;
            }
          });
        })
    })
  })
  .unknown(true);

module.exports = JoiSchema;
