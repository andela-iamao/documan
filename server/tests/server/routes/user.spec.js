/* global describe:true */
/* global db:true */
/* global expect:true */
/* global request:true */
/* global jwt:true */
/* global faker:true */

describe('Routes: user', () => {
  const User = db.Users;
  const Role = db.Roles;
  let token;
  let fakeUID;
  let secondUserToken;
  beforeEach((done) => {
    Role.bulkCreate([{
      title: 'regular', id: 2
    }, {
      title: 'admin', id: 1
    }])
      .then(() => {
        User.destroy({ where: {} })
          .then(() => {
            User.bulkCreate(faker.bulkCreateUser, { returning: true }).then((res) => {
              fakeUID = res[0];
              token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60),
                data: { id: res[0].id }
              }, process.env.JWT_SECRET);
              secondUserToken = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60),
                data: { id: res[2].id }
              }, process.env.JWT_SECRET);
              done();
            });
          });
      });
  });
  afterEach((done) => {
    Role.destroy({ where: {} })
      .then(() => {
        User.destroy({ where: {} })
          .then(() => done());
      });
  });
  describe('POST /api/v1/users', () => {
    describe('Status 200', () => {
      it('creates a new user', (done) => {
        request.post('/api/v1/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Butler',
            username: 'scalawag',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.firstname).to.eql('Rhett');
            expect(res.body.lastname).to.eql('Butler');
            expect(res.body.username).to.eql('scalawag');
            expect(res.body.email).to.eql('rhett@g.com');
            expect(res.body.email).to.not.eql('password7');
            done(err);
          });
      });
    });
    describe('Status 400', () => {
      it('rejects requests without an email field', (done) => {
        request.post('/api/v1/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Butler',
            username: 'scalawag',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('notNull Violation');
            expect(res.body.message).to.eql('email cannot be null');
            done(err);
          });
      });
      it('rejects requests without an incorrect email field', (done) => {
        request.post('/api/v1/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Butler',
            username: 'scalawag',
            email: 'rhett',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message).to.eql('Email is not valid');
            done(err);
          });
      });
      it('rejects requests without a firstname field', (done) => {
        request.post('/api/v1/users')
          .send({
            lastname: 'Butler',
            username: 'scalawag',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('notNull Violation');
            expect(res.body.message).to.eql('firstname cannot be null');
            done(err);
          });
      });
      it('rejects request if firstname field contains anything but letters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'Rhe1t',
              lastname: 'Butler',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message)
                .to.eql('firstname can only contain letters and/or - and \'');
              done(err);
            });
        });
      it('rejects request if firstname field does not contain letters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: '-----\'',
              lastname: 'Butler',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message).to.eql('firstname must contain letters');
              done(err);
            });
        });
      it('rejects request if firstname field is greater than 16 characters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'ScarlettMissisipi',
              lastname: 'Butler',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message)
                .to
                .eql(
                  'firstname cannot be less than 2 or greater than 16 characters'
                );
              done(err);
            });
        });
      it('rejects request if firstname field is less than 2 characters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'R',
              lastname: 'Butler',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code)
                .to.eql('Validation error');
              expect(res.body.message)
                .to
                .eql(
                  'firstname cannot be less than 2 or greater than 16 characters'
                );
              done(err);
            });
        });
      it('rejects requests without a lastname field', (done) => {
        request.post('/api/v1/users')
          .send({
            firstname: 'Rhett',
            username: 'scalawag',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('notNull Violation');
            expect(res.body.message).to.eql('lastname cannot be null');
            done(err);
          });
      });
      it('rejects request if lastname field contains anything but letters and/or \' and -',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'O\'hara',
              lastname: '$Butler',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message)
                .to.eql('lastname can only contain letters and/or - and \'');
              done(err);
            });
        });
      it('rejects request if lastname field does not contain letters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'O\'hara',
              lastname: '----\'',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message).to.eql('lastname must contain letters');
              done(err);
            });
        });
      it('rejects request if lastname field is greater than 16 characters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'Rhett',
              lastname: 'O\'HaraButtlerScarlett',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message)
                .to
                .eql('lastname cannot be less than 2 or greater than 16 characters');
              done(err);
            });
        });
      it('rejects request if lastname field is less than 2 characters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'Rhett',
              lastname: 'B',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code)
                .to.eql('Validation error');
              expect(res.body.message)
                .to
                .eql('lastname cannot be less than 2 or greater than 16 characters');
              done(err);
            });
        });
      it('rejects requests without a username field', (done) => {
        request.post('/api/v1/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Butler',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('notNull Violation');
            expect(res.body.message).to.eql('username cannot be null');
            done(err);
          });
      });
      it('rejects requests if username field is less than 4 characters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'Rhett',
              lastname: 'Butler',
              username: 'sc',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message)
                .to
                .eql('username cannot be less than 4 or greater than 16 characters');
              done(err);
            });
        });
      it('rejects requests if username field is greater than 16 characters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'Rhett',
              lastname: 'Pool',
              username: 'scalawage890olp0u',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message)
                .to
                .eql('username cannot be less than 4 or greater than 16 characters');
              done(err);
            });
        });
      it('rejects request if username field contains symbols except _ and .',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'Rhett',
              lastname: 'Butler',
              username: 'da n^ke',
              email: 'rhett@g.com',
              password: 'password7'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message)
                .to
                .eql('username must contains only letters, numbers, "." and "_"');
              done(err);
            });
        });
      it('rejects requests without a password field', (done) => {
        request.post('/api/v1/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Butler',
            username: 'scalawag',
            email: 'rhett@g.com'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('notNull Violation');
            expect(res.body.message)
              .to.eql('password cannot be null');
            done(err);
          });
      });
      it('rejects requests if password field is less than 8 characters',
        (done) => {
          request.post('/api/v1/users')
            .send({
              firstname: 'Rhett',
              lastname: 'Butler',
              username: 'scalawag',
              email: 'rhett@g.com',
              password: 'pass'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.error_code).to.eql('Validation error');
              expect(res.body.message)
                .to.eql('password cannot be less than 8 characters');
              done(err);
            });
        });
    });
    describe('Status 409', () => {
      it('rejects request if email already exists', (done) => {
        request.post('/api/v1/users')
          .send({
            lastname: 'John',
            username: 'depp',
            email: 'lordvold@gmail.com',
            password: 'I hate the potters',
            firstname: 'Thomas'
          })
          .expect(409)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Unique key violation');
            expect(res.body.message).to.eql('This email is already in use');
            done(err);
          });
      });
      it('rejects request if username already exists', (done) => {
        request.post('/api/v1/users')
          .send({
            lastname: 'John',
            username: 'tommyrid',
            email: 'lordold@gmail.com',
            password: 'I hate the potters',
            firstname: 'Thomas'
          })
          .expect(409)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Unique key violation');
            expect(res.body.message).to.eql('This username is already in use');
            done(err);
          });
      });
    });
  });
  describe('GET /api/v1/users/:id', () => {
    describe('Status 200', () => {
      it('Should return a user', (done) => {
        request.get(`/api/v1/users/${fakeUID.id}`)
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.be.a('object');
            expect(res.body.firstname).to.eql('Thomas');
            done(err);
          });
      });
    });
    describe('Status 401', () => {
      it('should reject an unauthorized user', (done) => {
        request.get(`/api/v1/users/${fakeUID.id}`)
          .set('Authorization', `JW ${token}`)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.eql('Sorry you don\'t have permission to perform this operation');
            done(err);
          });
      });
    });
  });
  describe('GET /api/v1/users', () => {
    describe('Status 200', () => {
      it('should get and return all users', (done) => {
        request.get('/api/v1/users')
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.length).to.eql(4);
            expect(Object.keys(res.body[0]).length).to.eql(9);
            done(err);
          });
      });
      it('should return 3 users starting from the second', (done) => {
        request.get('/api/v1/users/?limit=3&offset=1')
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.length).to.eql(3);
            expect(res.body[0].firstname).to.not.eql('Thomas');
            done(err);
          });
      });
      it('should return all users starting from the second', (done) => {
        request.get('/api/v1/users/?offset=1')
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.length).to.eql(3);
            expect(res.body[0].firstname).to.not.eql('Thomas');
            done(err);
          });
      });
      it('should return 2 users', (done) => {
        request.get('/api/v1/users/?limit=2')
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.length).to.eql(2);
            expect(res.body[0].firstname).to.eql('Thomas');
            done(err);
          });
      });
      it('should return all users if limit exceeds max users', (done) => {
        request.get('/api/v1/users/?limit=10')
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.length).to.eql(4);
            expect(res.body[0].firstname).to.eql('Thomas');
            done(err);
          });
      });
    });
    describe('Status 401', () => {
      it('should reject an unauthorized user', (done) => {
        request.get(`/api/v1/users/${fakeUID}`)
          .set('Authorization', `${token}s2`)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.eql('Sorry you don\'t have permission to perform this operation');
            done(err);
          });
      });
    });
  });

  describe('POST /api/v1/users/login', () => {
    describe('Status 200', () => {
      it('should log a valid user in', (done) => {
        request.post('/api/v1/users/login')
        .send({
          email: 'inumidun@sky.com',
          password: 'password!'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.token).to.be.ok;
          done(err);
        });
      });
    });
    describe('Status 401', () => {
      it('should reject a request without an email', (done) => {
        request.post('/api/v1/users/login')
          .send({
            password: 'password!'
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Unauthorized Access');
            expect(res.body.message).to.eql('email/password do not match');
            done(err);
          });
      });
      it('should reject a request without a password', (done) => {
        request.post('/api/v1/users/login')
          .send({
            email: 'inumidun@sky.com'
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Unauthorized Access');
            expect(res.body.message).to.eql('email/password do not match');
            done(err);
          });
      });
      it('should reject a request with an invalid password', (done) => {
        request.post('/api/v1/users/login')
          .send({
            email: 'inumidun@sky.com',
            password: 'passrd!'
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Unauthorized Access');
            expect(res.body.message).to.eql('email/password do not match');
            done(err);
          });
      });
      it('should reject a request with an invalid email', (done) => {
        request.post('/api/v1/users/login')
          .send({
            email: 'inumidun@skee.com',
            password: 'password!'
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Unauthorized Access');
            expect(res.body.message).to.eql('email/password do not match');
            done(err);
          });
      });
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update a user with given id', (done) => {
      request.put(`/api/v1/users/${fakeUID.id}`)
        .set('Authorization', token)
        .send({
          password: 'a new password'
        })
        .expect(204)
        .end((err, res) => {
          expect(res.text).to.eql('');
          expect(Object.keys(res.body).length).to.eql(0);
          done(err);
        });
    });
    it('should reject request if token is not valid', (done) => {
      request.put(`/api/v1/users/${fakeUID.id}`)
        .set('Authorization', `s${token}`)
        .send({
          password: 'a new password'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request if sender\'s id does not match param', (done) => {
      request.put(`/api/v1/users/${fakeUID.id}`)
        .set('Authorization', secondUserToken)
        .send({
          password: 'a new password'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.eql('Cannot update properties of another user');
          done(err);
        });
    });
    it('should reject request if email already exists', (done) => {
      request.put(`/api/v1/users/${fakeUID.id}`)
        .set('Authorization', token)
        .send({
          email: faker.bulkCreateUser[2].email
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.eql('This email is already in use');
          done(err);
        });
    });
    it('should reject request if username exists', (done) => {
      request.put(`/api/v1/users/${fakeUID.id}`)
        .set('Authorization', token)
        .send({
          username: faker.bulkCreateUser[2].username
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.eql('This username is already in use');
          done(err);
        });
    });
  });
});
