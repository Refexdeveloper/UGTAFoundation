const jwt = require('jsonwebtoken');
const { User } = require('../models');
const Response = require('../helpers/response');

const { APP_KEY } = process.env;

exports.authCheck = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return Response.responseStatus(res, 401, 'Authentication required');
    }
    if (!APP_KEY) {
      return Response.responseStatus(
        res,
        500,
        'Server authentication misconfigured'
      );
    }
    const token = authorization.slice(7);
    const data = jwt.verify(token, APP_KEY);
    if (!data?.id) {
      return Response.responseStatus(res, 401, 'Invalid token');
    }
    req.userData = data;
    return next();
  } catch (error) {
    const message =
      error.name === 'TokenExpiredError'
        ? 'Token has expired'
        : 'Invalid or expired token';
    return Response.responseStatus(res, 401, message);
  }
};

exports.authAllowTypes = (types = []) => {
  return async (req, res, next) => {
    try {
      if (!req.userData?.id) {
        return Response.responseStatus(res, 401, 'Authentication required');
      }
      const user = await User.findByPk(req.userData.id);
      if (!user || !user.is_active) {
        return Response.responseStatus(res, 403, 'Account inactive or not found');
      }
      if (!types.includes(user.user_type)) {
        return Response.responseStatus(res, 403, "You don't have permission");
      }
      req.user = user;
      return next();
    } catch (error) {
      return Response.responseStatus(res, 500, 'Internal server error');
    }
  };
};
