const { param } = require('express-validator');
const uuid = require('uuid');

const idValidation = (name = 'id') => 
param(name, `${name} isn't valid`).custom(value =>
  new Promise((resolve, reject) => {
    if (uuid.validate(value)) {
      resolve();
    }
    reject();
  })
);

const idValidationFn = (value) =>
new Promise((resolve, reject) => {
  if (uuid.validate(value)) {
    resolve();
  }
  reject();
});

module.exports = { idValidation, idValidationFn };