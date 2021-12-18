import { param, ValidationChain } from 'express-validator';
import { validate } from 'uuid';

const idValidation = (name = 'id'): ValidationChain => 
param(name, `${name} isn't valid`).custom(value =>
  new Promise((resolve, reject) => {
    if (validate(value)) {
      resolve(null);
    }
    reject();
  })
);

const idValidationFn = (value: string): Promise<null> =>
new Promise((resolve, reject) => {
  if (validate(value)) {
    resolve(null);
  }
  reject();
});

export { idValidation, idValidationFn };