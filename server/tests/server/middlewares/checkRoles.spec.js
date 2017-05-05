import httpMocks from 'node-mocks-http';
import { isAdmin, getRoles, targetIsAdmin } from '../../../middlewares/checkRoles';

let req = {};
let res = {};

describe('checkRoles middlewares', () => {
  let adminToken;
  let adminId;
  let regularId;
  let regularToken;
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
        db.Users.bulkCreate(
          [faker.valid_user, faker.admin_user], { individualHooks: true })
          .then((users) => {
            adminId = users[1].id;
            adminToken = tokenize(adminId);
            regularId = users[0].id
            regularToken = tokenize(regularId);
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

  describe('isAdmin', () => {
    it('should set req.isAdmin and move to next controller/middleware',
    (done) => {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
        headers: { Authorization: adminToken },
        decoded: { id: adminId }
      });
      res = httpMocks.createResponse();
      const middlewareStub = {
        callback: () => null
      };
      sinon.spy(middlewareStub, 'callback');
      isAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
    it('should not set req.isAdmin but move to next controller/middleware',
    (done) => {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/v1/users',
        headers: { Authorization: regularToken },
        decoded: { id: regularId }
      });
      res = responseEvent();
      const middlewareStub = {
        callback: () => null
      };
      sinon.spy(middlewareStub, 'callback');
      isAdmin(req, res, middlewareStub.callback);
      expect(req.isAdmin).to.not.eql(true);
      expect(middlewareStub.callback).to.have.been.called;
      done();
      });
    });

  describe('getRoles middleware', () => {
    it('should go to next if target is admin', (done) => {
      req = httpMocks.createRequest({
        method: 'GET',
        url: `/api/v1/users/${adminId}`,
        headers: { Authorization: adminToken },
        decoded: { id: regularId }
      });
      res = httpMocks.createResponse();
      const middlewareStub = {
        callback: () => null
      };
      sinon.spy(middlewareStub, 'callback');
      getRoles(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
  });

  describe('targetIsAdmin middleware', () => {
    it('should go to next if target is admin', (done) => {
      req = httpMocks.createRequest({
        method: 'GET',
        url: `/api/v1/users/${adminId}`,
        headers: { Authorization: adminToken },
        decoded: { id: adminToken }
      });
      res = httpMocks.createResponse();
      const middlewareStub = {
        callback: () => null
      };
      sinon.spy(middlewareStub, 'callback');
      getRoles(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
  });
});
