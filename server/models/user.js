'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {}

    toSafeJSON() {
      const json = this.toJSON();
      delete json.password;
      return json;
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(85),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(85),
        allowNull: true,
        defaultValue: '',
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.ENUM('SuperAdmin', 'Admin', 'Editor'),
        allowNull: false,
        defaultValue: 'Admin',
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      last_login_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'modified_at',
      deletedAt: 'deleted_at',
    }
  );

  return User;
};
