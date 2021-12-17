import { param } from 'express-validator';
import { validate } from 'uuid';

const idValidation = (name = 'id') => 
param(name, `${name} isn't valid`).custom(value =>
  new Promise((resolve, reject) => {
    if (validate(value)) {
      resolve(null);
    }
    reject();
  })
);

const idValidationFn = (value) =>
new Promise((resolve, reject) => {
  if (validate(value)) {
    resolve(null);
  }
  reject();
});

export { idValidation, idValidationFn };