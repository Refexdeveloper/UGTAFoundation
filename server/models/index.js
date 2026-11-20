'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const fileConfig = require(path.join(__dirname, '../config/config.json'))[env];
const db = {};

const config = {
  ...fileConfig,
  username: process.env.DB_USERNAME || fileConfig.username,
  password: process.env.DB_PASSWORD || fileConfig.password,
  database: process.env.DB_DATABASE || fileConfig.database,
  host: process.env.DB_HOST || fileConfig.host,
  port: Number(process.env.DB_PORT || fileConfig.port || 3306),
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.includes('.test.js')
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
