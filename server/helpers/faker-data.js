const faker = require('faker');

const fakeData = {
  valid_user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: 'usernam_',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  no_firstname_user: {
    lastname: faker.name.lastName(),
    username: 'fake_us3',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  no_lastname_user: {
    firstname: faker.name.firstName(),
    username: 'fake_us4',
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  adminRole: {
    title: 'Admin'
  },
  regularRole: {
    title: 'Regular'
  },
  newRole: {
    title: 'normal'
  },
  document: {
    title: `${faker.lorem.words()} = title`,
    content: faker.lorem.paragraph(),
    ownerId: 2,
    accessId: 1,
    createdAt: '2017-03-31 13:51:40.653+01',
    updatedAt: '2017-03-31 13:51:40.653+01'
  },
  privateDoc: {
    title: `${faker.lorem.words()} = title`,
    content: faker.lorem.paragraph(),
    accessId: 2,
    ownerId: 3,
    createdAt: '2017-03-31 13:51:40.653+01',
    updatedAt: '2017-03-31 13:51:40.653+01'
  },
  roleDocument: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    accessId: 3,
    ownerId: 1,
    createdAt: '2017-03-31 13:51:40.653+01',
    updatedAt: '2017-03-31 13:51:40.653+01'
  },
  updateDoc: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    accessId: 1,
    ownerId: 2,
    createdAt: '2017-03-31 13:51:40.653+01',
    updatedAt: '2017-03-31 13:51:40.653+01'
  }
};

module.exports = fakeData;
