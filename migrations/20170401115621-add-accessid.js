module.exports = {
  up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      queryInterface.addColumn('Documents', 'accessId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }),
      queryInterface.addColumn('Documents', 'version', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '1.0.0'
      })
    ];
  },

  down(queryInterface/* , Sequelize*/) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('Documents', 'accessId');
  }
};
