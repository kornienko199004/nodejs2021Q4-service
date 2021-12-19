import { param, ValidationChain } from 'express-validator';
import { validate } from 'uuid';

/**
 * Returns ValidationChain for id validation
 * @param name Param name
 * @returns ValidationChain
 */
const idValidation = (name = 'id'): ValidationChain => 
param(name, `${name} isn't valid`).custom(value =>
  new Promise((resolve, reject) => {
    if (validate(value)) {
      resolve(null);
    }
    reject();
  })
);

/**
 * Id validation function
 * @param value 
 * @returns Promise<null>
 */
const idValidationFn = (value: string): Promise<null> =>
new Promise((resolve, reject) => {
  if (validate(value)) {
    resolve(null);
  }
  reject();
});

export { idValidation, idValidationFn };