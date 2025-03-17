'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate() {}
  }
  Users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 10000,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: 'users',
      modelName: 'Users',
    }
  );
  return Users;
};
