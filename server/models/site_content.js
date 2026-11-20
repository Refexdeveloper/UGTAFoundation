'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SiteContent extends Model {
    static associate() {}
  }

  SiteContent.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      section_key: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      content: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'SiteContent',
      tableName: 'site_contents',
      createdAt: 'created_at',
      updatedAt: 'modified_at',
    }
  );

  return SiteContent;
};
