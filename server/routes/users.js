const router = require('express').Router();
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');
const Type = require('../utils/userTypes');

const canManageUsers = [
  auth.authCheck,
  auth.authAllowTypes([Type.SuperAdmin, Type.Admin]),
];

router.get('/users', ...canManageUsers, usersController.list);
router.get('/users/:id', ...canManageUsers, usersController.getById);
router.post('/users', ...canManageUsers, usersController.create);
router.put('/users/:id', ...canManageUsers, usersController.update);
router.delete(
  '/users/:id',
  auth.authCheck,
  auth.authAllowTypes([Type.SuperAdmin]),
  usersController.remove
);

module.exports = router;
