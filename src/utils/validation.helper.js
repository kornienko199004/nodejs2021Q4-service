const { param } = require('express-validator');
const uuid = require('uuid');

const idValidation = () => 
param('id', 'id isn\'t valid').custom(value =>
  new Promise((resolve, reject) => {
    if (uuid.validate(value)) {
      resolve();
    }
    reject();
  })
);

module.exports = { idValidation };