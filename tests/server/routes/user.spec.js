describe('Routes: user', () => {
  const User = db.Users;
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).done(() => {
      User.destroy({ where: {} })
        .then(() => {
          User.create({
            lastname: 'Riddle',
            username: 'tommyrid',
            email: 'lordvold@gmail.com',
            password: 'I hate the potters',
            firstname: 'Thomas'
          }).then(() => done());
        });
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
              .to.eql('lastname can only contain letters and/or \' and -');
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
              .to.eql('lastname cannot be less than 2 or greater than 16 characters');
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
              .to.eql('lastname cannot be less than 2 or greater than 16 characters');
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
              .to.eql('username cannot be less than 4 or greater than 8 characters');
            done(err);
          });
      });
      it('rejects requests if username field is greater than 8 characters',
        (done) => {
        request.post('/api/v1/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Pool',
            username: 'scalawage',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to.eql('username cannot be less than 4 or greater than 8 characters');
            done(err);
          });
      });
      it('rejects request if username field contains symbols except _',
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
            expect(res.body.message).to.eql('username cannot contain symbols or spaces except _');
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
});
