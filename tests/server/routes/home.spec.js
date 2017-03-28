describe('Routes: Index', () => {
  describe('GET /', () => {
    it('returns the API status', (done) => {
      request.get('/')
        .expect(200)
        .end((err, res) => {
          const expected = {
            status: 200,
            message: 'Welcome to document management system'
          };
          expect(res.body).to.eql(expected);
          done(err);
        });
    });
  });
});
