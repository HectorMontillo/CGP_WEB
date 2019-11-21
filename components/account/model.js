const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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

const model = mongoose.model("Account", mySchema);
module.exports = model;
