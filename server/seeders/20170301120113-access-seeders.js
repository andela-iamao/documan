module.exports = {
  up(queryInterface/* , Sequelize */) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Access', [{
      title: 'public',
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }, {
      title: 'private',
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }, {
      title: 'role',
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }], {});
  },

  down(queryInterface/* , Sequelize*/) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Access', null, {});
  }
};
