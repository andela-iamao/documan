// /* global expect: true */
// import loginUser from '../../src/actions/login.action';
//
// describe('Action::Error', () => {
//   describe('#clearError()', () => {
//     it('returns action CLEAR_ERROR', () => {
//       const fn = loginUser();
//       expect(fn).to.be.a.Function;
//       const dispatch = spy(fn);
//       const getState = () => ({
//         email: 'xx@w.com',
//         password: '777'
//       });
//       fn(dispatch, getState);
//       // expect(dispatch).to.eql({ type: 'VALIDATION_ERROR' });
//       // const action = loginUser({
//       //   email: 'xx@w.com',
//       //   password: '777'
//       // });
//       // console.log(action({
//       //   email: 'xx@w.com',
//       //   password: '777'
//       // }));
//       // expect(action).to.deep.equal({
//       //   type: 'CLEAR_ERROR'
//       // });
//     });
//   });
//
//   // describe('#validationError()', () => {
//   //   it('returns action VALIDATION_ERROR with error info', () => {
//   //     const action = validationError({
//   //       error: 'firstname is empty'
//   //     });
//   //     expect(action).to.deep.equal({
//   //       type: 'VALIDATION_ERROR',
//   //       payload: {
//   //         error: 'firstname is empty'
//   //       }
//   //     });
//   //   });
//   //   it('returns action VALIDATION_ERROR with default info', () => {
//   //     const action = validationError();
//   //     expect(action).to.deep.equal({
//   //       type: 'VALIDATION_ERROR',
//   //       payload: {
//   //         error: 'Oops! an error occured :('
//   //       }
//   //     });
//   //   });
//   // });
// });
