import httpMocks from 'node-mocks-http';
import { verifyToken, isBlacklist } from '../../../middlewares/authenticate';

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

  describe('verifyToken', () => {
    it('should verify and move to next middleware/controller', (done) => {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
        headers: { Authorization: token }
      });
      res = httpMocks.createResponse();
      const middlewareStub = {
        callback: () => null
      };
      sinon.spy(middlewareStub, 'callback');
      verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
    it('should reject an invalid token', (done) => {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
        headers: { Authorization: 'invalid token' }
      });
      res = responseEvent();
      const middlewareStub = {
        callback: () => null
      };
      sinon.spy(middlewareStub, 'callback');
      verifyToken(req, res, middlewareStub.callback);
      res.on('end', () => {
        const resp = JSON.parse(res._getData());
        expect(resp['message']).to
          .eql('Sorry you don\'t have permission to perform this operation');
        done();
      });
    });
  });
  describe('isBlacklist middleware', () => {
    it('should go to next if token is not in blacklist', (done) => {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
        headers: { Authorization: token }
      });
      res = httpMocks.createResponse();
      const middlewareStub = {
        callback: () => null
      };
      sinon.spy(middlewareStub, 'callback');
      isBlacklist(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
    it('should return an error if token is in blacklist',
      (done) => {
        request.post('/api/v1/users/logout')
          .set({ Authorization: token })
          .expect(204)
          .end((err, resp) => {
            req = httpMocks.createRequest({
              method: 'GET',
              url: '/api/v1/users',
              headers: { Authorization: token }
            });
            res = responseEvent();
            const middlewareStub = {
              callback: () => null
            };
            sinon.spy(middlewareStub, 'callback');
            isBlacklist(req, res, middlewareStub.callback);
            res.on('end', () => {
              const resp = JSON.parse(res._getData());
              expect(resp['message']).to
                .eql('Sorry you don\'t have permission to perform this operation');
              done();
            });
          });
      });
  });
});
