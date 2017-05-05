import httpMocks from 'node-mocks-http';
import { signup, folders } from '../../../middlewares/validate';

let req = {};
let res = {};

describe('Authenticate middleware', () => {
  let token;
  const responseEvent = () => httpMocks
    .createResponse({ eventEmitter: events.EventEmitter });
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).done(() => {
      db.Roles.bulkCreate([{
        title: 'custom', id: 3
      }, {
        title: 'regular', id: 2
      }, {
        title: 'admin', id: 1
      }]).then(() => {
        db.Users.create(faker.valid_user)
          .then((user) => {
            token = tokenize(user.id);
            done();
          });
      });
    });
  });
  afterEach((done) => {
    db.Roles.destroy({ where: {} })
      .then(() => {
        db.Blacklist.destroy({ where: {} })
          .then(() => {
            done();
          });
      });
  });

  describe('signup validation middleware', () => {
    it('should call next on valid signup input credentials', (done) => {
      req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/v1/users',
        headers: { Authorization: token },
        body: {
          firstname: 'Al',
          lastname: 'Elric',
          username: 'alric',
          email: 'al@al.com',
          password: '1234567890'
        }
      });
      res = httpMocks.createResponse();
      const middlewareStub = {
        callback: () => null
      };
      sinon.spy(middlewareStub, 'callback');
      signup(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
    it('should return an error for invalid signup credentials', (done) => {
      req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/v1/users',
        headers: { Authorization: token },
        body: {
          lastname: 'Elric',
          username: 'alric',
          email: 'al@al.com',
          password: '1234567890'
        }
      });
      res = responseEvent();
      const middlewareStub = {
        callback: (error) => {
          if (error) {
            throw new Error (error);
          }
        }
      };
      sinon.spy(middlewareStub, 'callback');
      signup(req, res, middlewareStub.callback);
      const resp = JSON.parse(res._getData());
      expect(resp['message']).to.eql('firstname cannot be empty');
      done();
    });
  });

  describe('folder validation middleware', () => {

  });
});
