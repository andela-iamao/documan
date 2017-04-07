const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface/* , Sequelize*/) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      firstname: 'Fyodor',
      lastname: 'Dostoyevsky',
      email: 'efdee@g.com',
      username: 'fyodor',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }, {
      firstname: 'Margarett',
      lastname: 'Mitchell',
      email: 'mag@me.com',
      username: 'maggie',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }, {
      firstname: 'Emily',
      lastname: 'Bronte',
      email: 'emmy@g.com',
      username: 'milly',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }, {
      firstname: 'Emily',
      lastname: 'Dickinson',
      email: 'emd@g.com',
      username: 'emdee',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }, {
      firstname: 'Bram',
      lastname: 'Stoker',
      email: 'bstoke@g.com',
      username: 'drac_baba',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }
    ], {});
  },

  down(queryInterface/* , Sequelize*/) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
