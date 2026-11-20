const { Op } = require('sequelize');
const { User } = require('../models');
const Response = require('../helpers/response');
const {
  hashPassword,
  validatePasswordStrength,
} = require('../utils/password');
const Type = require('../utils/userTypes');

function sanitize(user) {
  return user.toSafeJSON ? user.toSafeJSON() : user;
}

exports.list = async (_req, res) => {
  try {
    const users = await User.findAll({
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['password'] },
    });
    return Response.responseStatus(res, 200, 'Users fetched', users);
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to fetch users', {
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return Response.responseStatus(res, 404, 'User not found');
    return Response.responseStatus(res, 200, 'User fetched', user);
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to fetch user', {
      error: error.message,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      first_name,
      last_name = '',
      email,
      password,
      user_type = Type.Admin,
      is_active = true,
    } = req.body;

    if (!first_name || !email || !password) {
      return Response.responseStatus(
        res,
        400,
        'first_name, email and password are required'
      );
    }

    const strength = validatePasswordStrength(password);
    if (!strength.valid) {
      return Response.responseStatus(res, 400, strength.errors.join('; '));
    }

    const allowedTypes = [Type.SuperAdmin, Type.Admin, Type.Editor];
    if (!allowedTypes.includes(user_type)) {
      return Response.responseStatus(res, 400, 'Invalid user_type');
    }

    // Only SuperAdmin can create another SuperAdmin
    if (
      user_type === Type.SuperAdmin &&
      req.user.user_type !== Type.SuperAdmin
    ) {
      return Response.responseStatus(
        res,
        403,
        'Only SuperAdmin can create SuperAdmin users'
      );
    }

    const exists = await User.findOne({
      where: { email: String(email).trim().toLowerCase() },
    });
    if (exists) {
      return Response.responseStatus(res, 409, 'Email already registered');
    }

    const user = await User.create({
      first_name: String(first_name).trim(),
      last_name: String(last_name || '').trim(),
      email: String(email).trim().toLowerCase(),
      password: await hashPassword(password),
      user_type,
      is_active: Boolean(is_active),
    });

    return Response.responseStatus(res, 201, 'User created', sanitize(user));
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to create user', {
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return Response.responseStatus(res, 404, 'User not found');

    const {
      first_name,
      last_name,
      email,
      password,
      user_type,
      is_active,
    } = req.body;

    if (
      user_type === Type.SuperAdmin &&
      req.user.user_type !== Type.SuperAdmin
    ) {
      return Response.responseStatus(
        res,
        403,
        'Only SuperAdmin can assign SuperAdmin role'
      );
    }

    if (email) {
      const clash = await User.findOne({
        where: {
          email: String(email).trim().toLowerCase(),
          id: { [Op.ne]: user.id },
        },
      });
      if (clash) {
        return Response.responseStatus(res, 409, 'Email already registered');
      }
    }

    const updates = {};
    if (first_name !== undefined) updates.first_name = String(first_name).trim();
    if (last_name !== undefined) updates.last_name = String(last_name).trim();
    if (email !== undefined) updates.email = String(email).trim().toLowerCase();
    if (user_type !== undefined) updates.user_type = user_type;
    if (is_active !== undefined) updates.is_active = Boolean(is_active);

    if (password) {
      const strength = validatePasswordStrength(password);
      if (!strength.valid) {
        return Response.responseStatus(res, 400, strength.errors.join('; '));
      }
      updates.password = await hashPassword(password);
    }

    await user.update(updates);
    return Response.responseStatus(res, 200, 'User updated', sanitize(user));
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to update user', {
      error: error.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return Response.responseStatus(res, 404, 'User not found');

    if (user.id === req.user.id) {
      return Response.responseStatus(res, 400, 'You cannot delete your own account');
    }

    if (
      user.user_type === Type.SuperAdmin &&
      req.user.user_type !== Type.SuperAdmin
    ) {
      return Response.responseStatus(res, 403, 'Cannot delete SuperAdmin');
    }

    await user.destroy();
    return Response.responseStatus(res, 200, 'User deleted');
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to delete user', {
      error: error.message,
    });
  }
};
