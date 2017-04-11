/* global describe:true */
/* global db:true */
/* global expect:true */
/* global request:true */
/* global jwt:true */
/* global faker:true */

describe('Routes: documents', () => {
  const User = db.Users;
  const Role = db.Roles;
  const Document = db.Document;
  let token;
  let fakeUID;
  // let secondUserToken;
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).done(() => {
      Role.create({ title: 'regular', id: 2 }).then(() => {
        User.destroy({ where: {} })
          .then(() => {
            User.create(faker.valid_user).then((res) => {
              fakeUID = res;
              token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60),
                data: { id: res.id }
              }, process.env.JWT_SECRET);
              db.Access.bulkCreate(faker.allAccess).then(() => {
                Document.bulkCreate(faker.createDocument(fakeUID.id)).then(() => {
                  done();
                });
              });
            });
          });
      });
    });
  });
  afterEach((done) => {
    db.Roles.destroy({ where: {} })
      .then(() => {
        db.Access.destroy({ where: {} }).then(() => {
          done();
        });
      });
  });
  describe('GET /api/v1/documents', () => {
    it('returns all documents in the database', (done) => {
      request.get('/api/v1/documents')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(Object.keys(res.body)).to.have.lengthOf(5);
          done();
        });
    });
  });
});
