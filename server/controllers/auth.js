const jwt = require('jsonwebtoken');
const { User } = require('../models');
const Response = require('../helpers/response');
const {
  comparePassword,
  isWeakPassword,
} = require('../utils/password');

const { APP_KEY } = process.env;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return Response.responseStatus(res, 400, 'Email and password are required');
    }

    const user = await User.findOne({ where: { email: String(email).trim().toLowerCase() } });
    if (!user || !user.is_active) {
      return Response.responseStatus(res, 401, 'Invalid email or password');
    }

    const ok = await comparePassword(password, user.password);
    if (!ok) {
      return Response.responseStatus(res, 401, 'Invalid email or password');
    }

    if (isWeakPassword(password)) {
      return Response.responseStatus(
        res,
        403,
        'This account uses a weak password. Reset it with the admin seed script before signing in.'
      );
    }

    if (!APP_KEY) {
      return Response.responseStatus(
        res,
        500,
        'Server authentication misconfigured'
      );
    }

    await user.update({ last_login_at: new Date() });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        name: `${user.first_name} ${user.last_name || ''}`.trim(),
      },
      APP_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toSafeJSON(),
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return Response.responseStatus(res, 500, 'Internal server error', {
      error: error.message,
    });
  }
};

exports.verify = async (req, res) => {
  try {
    const user = await User.findByPk(req.userData.id);
    if (!user || !user.is_active) {
      return Response.responseStatus(res, 401, 'Invalid token');
    }
    return res.json({
      success: true,
      message: 'Token is valid',
      user: user.toSafeJSON(),
    });
  } catch (error) {
    return Response.responseStatus(res, 500, 'Internal server error');
  }
};

exports.logout = async (_req, res) => {
  return Response.responseStatus(res, 200, 'Logout successful');
};
