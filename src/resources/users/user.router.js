const router = require('express').Router();
const { validationResult  } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const { messages } = require('../../common/constants');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(usersService.validate('createUser'), async (req, res)  =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const user = await usersService.create(req.body);
  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').get(usersService.validate('getUser'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const id = req.params?.id;
  const user = await usersService.getUser(id);

  if (user) {
    return res.json(User.toResponse(user));
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('User') });
})
.put(usersService.validate('updateUser'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  const id = req.params?.id;
  const user = await usersService.updateUser(id, req.body);

  if (user) {
    return res.json(User.toResponse(user));
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('User') });
})
.delete(usersService.validate('deleteUser'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  const id = req.params?.id;
  const user = await usersService.deleteUser(id);

  if (user) {
    return res.status(StatusCodes.NO_CONTENT).json({ message: messages.deleted('User') });
  }
  return res.status(StatusCodes.NOT_FOUND).json({ message: messages.notFound('User') });
});

module.exports = router;
