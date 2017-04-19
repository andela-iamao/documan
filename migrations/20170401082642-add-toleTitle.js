module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 2
    });
  },

  down: (queryInterface /* , Sequelize */) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('Users', 'roleId');
  }
};
