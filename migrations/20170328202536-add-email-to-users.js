module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      // allowNull: false,
      unique: true,
      validators: {
        isEmail: true
      }
    });
  },

  down: (queryInterface /* , Sequelize */) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('Users', 'email');
  }
};
