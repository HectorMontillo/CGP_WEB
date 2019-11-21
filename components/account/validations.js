const Joi = require("joi");

const mySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: String,
  notes: String,
  accountNumber: String,
  colors: {
    start: Number, // Color inicio del bg de la cuenta
    end: Number // Color final del bg de la cuenta
  },
  accountType: {
    type: String,
    require: true
  },
  //For account types
  cashAccount: {
    cash: Number //Efectivo en la cuenta
  },
  savingAccount: {
    balance: Number //Saldo de la cuenta de ahorros
  },
  loanAccount: {
    startDate: Date, //Fecha de inicio del credito
    endDate: Date, //Fecha en la que finaliza el crédito
    TAE: Number, // TAE porcentaje
    balance: Number // Saldo de la cuenta de prestamo
  },
  creditCard: {
    fit: Number, // Cupo de la tarjeta de credito
    balance: Number, // Saldo de la tarjea de crédito
    cutoffDate: Date, // Fecha de la proxima cuota mensual
    handlingFee: Number // Cuota de manejo
  },
  investmentAccount: {
    investment: Number, // Monto invertido
    interests: Number, // Tasa de interes
    gain: Number // Ganancias
  },
  bank: {
    type: Schema.ObjectId,
    ref: "Bank"
  },
  currency: {
    type: Schema.ObjectId,
    ref: "Currency"
  },
  transactions: [
    {
      type: Schema.ObjectId,
      ref: "Transaction"
    }
  ]
});

const JoiSchema = Joi.object().keys({
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
  /*
  icon: Joi.string().error(errors => {
    errors.forEach(err => {
      switch (err.type) {
        case "any.empty":
          err.message = "La ruta del icono es incorrecta!!";
          break;
        default:
          err.message = "Oh oh, hay algo mal con el icono";
          break;
      }
    });
  }),*/
  accountNumber: Joi.string()
    .creditCard()
    .error(errors => {
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
  notes: Joi.string()
    .max(20)
    .error(errors => {
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
    .regex(/^(Ahorros|Efectivo|Inversion|Tarjeta\sde\scredito|Prestamo)$/gi)
    .error(errors => {
      errors.forEach(err => {
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
  }),

  //--------------------------------------------------------------------------------
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
