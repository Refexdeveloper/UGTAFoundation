const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const COMMON_PASSWORDS = [
  'password',
  'password123',
  'admin',
  'admin123',
  '12345678',
  'qwerty',
  'welcome',
  'changeme',
];

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hash) {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
}

function validatePasswordStrength(password) {
  const errors = [];
  if (!password || typeof password !== 'string') {
    return { valid: false, errors: ['Password is required'] };
  }
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push('Password is too common');
  }
  return { valid: errors.length === 0, errors };
}

function isWeakPassword(password) {
  return !validatePasswordStrength(password).valid;
}

module.exports = {
  hashPassword,
  comparePassword,
  validatePasswordStrength,
  isWeakPassword,
  SALT_ROUNDS,
};
