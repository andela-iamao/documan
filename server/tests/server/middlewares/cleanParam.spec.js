import httpMocks from 'node-mocks-http';
import integerQuery from '../../../middlewares/cleanParam';

let req = {};
let res = {};

describe('integerQuery middleware', () => {
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

  it('should call next on a valid param', (done) => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/users/23',
      headers: { Authorization: token }
    });
    res = httpMocks.createResponse();
    const middlewareStub = {
      callback: () => null
    };
    sinon.spy(middlewareStub, 'callback');
    integerQuery(req, res, middlewareStub.callback);
    expect(middlewareStub.callback).to.have.been.called;
    done();
  });

  it('should reject an invalid param', (done) => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/users/?q=cknkc',
      headers: { Authorization: token }
    });
    res = responseEvent();
    const middlewareStub = {
      callback: () => null
    };
    sinon.spy(middlewareStub, 'callback');
    integerQuery(req, res, middlewareStub.callback);
    const resp = JSON.parse(res._getData());
    expect(resp['message']).to
      .eql('Invalid input for query');
    done();
  });
});
