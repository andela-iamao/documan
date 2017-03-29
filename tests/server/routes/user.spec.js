describe('Routes: user', () => {
  const User = db.Users;
  beforeEach((done) => {
    db.sequelize.sync().done(() => {
      User.destroy({ where: {} })
        .then(() => {
          User.create({
            lastname: "Riddle",
            username: "tomrid",
            email: "lordvold@gmail.com",
            password: "fuck the potters",
            firstname: "Thomas"
          }).then(() => done());
        });
    });
  });

  describe("GET /api/v1/users", () => {
    describe("Status 200", () => {
      it("returns a list of all users", done => {
        request.get('/api/v1/users')
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(1);
            done(err);
          });
      });
    });
  });
});
