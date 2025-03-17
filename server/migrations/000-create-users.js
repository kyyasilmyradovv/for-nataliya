'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 10000,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    });

    // Seed table
    let seeders = [{ balance: 10000 }];
    await queryInterface.bulkInsert('users', seeders);
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  },
};
