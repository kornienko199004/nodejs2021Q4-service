import { param } from 'express-validator';
import uuid from 'uuid';

const idValidation = (name = 'id') => 
param(name, `${name} isn't valid`).custom(value =>
  new Promise((resolve, reject) => {
    if (uuid.validate(value)) {
      resolve(null);
    }
    reject();
  })
);

const idValidationFn = (value) =>
new Promise((resolve, reject) => {
  if (uuid.validate(value)) {
    resolve(null);
  }
  reject();
});

export { idValidation, idValidationFn };