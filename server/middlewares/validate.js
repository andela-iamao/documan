import { requiredField } from '../helpers/helper';

export default (req, res, next) => {
  const emptyField = requiredField([
    'firstname',
    'lastname',
    'username',
    'email',
    'password'
  ], req.body);
  if (emptyField) {
    return res.status(400).json({
      error_code: 'notNull Violation',
      message: emptyField
    });
  }
  next();
};
