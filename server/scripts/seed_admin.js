/**
 * Seed SuperAdmin user.
 *
 *   ADMIN_PASSWORD='UgtaAdmin!2026x' npm run seed:admin
 */
require('dotenv').config();
const { sequelize, User } = require('../models');
const { hashPassword, validatePasswordStrength } = require('../utils/password');
const Type = require('../utils/userTypes');

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'admin@ugtafoundation.org')
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'UgtaAdmin!2026x';
  const firstName = process.env.ADMIN_FIRST_NAME || 'UGTA';
  const lastName = process.env.ADMIN_LAST_NAME || 'Admin';

  const strength = validatePasswordStrength(password);
  if (!strength.valid) {
    console.error('Password policy failed:');
    strength.errors.forEach((e) => console.error(' -', e));
    process.exit(1);
  }

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const hashed = await hashPassword(password);
    const existing = await User.findOne({ where: { email } });

    if (existing) {
      await existing.update({
        password: hashed,
        first_name: firstName,
        last_name: lastName,
        user_type: Type.SuperAdmin,
        is_active: true,
      });
      console.log(`Updated SuperAdmin: ${email}`);
    } else {
      await User.create({
        email,
        password: hashed,
        first_name: firstName,
        last_name: lastName,
        user_type: Type.SuperAdmin,
        is_active: true,
      });
      console.log(`Created SuperAdmin: ${email}`);
    }

    console.log('Login at /admin/login');
    console.log(`Email: ${email}`);
    if (!process.env.ADMIN_PASSWORD) {
      console.log('Password: UgtaAdmin!2026x (change after first login)');
    }
    await sequelize.close();
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
}

main();
