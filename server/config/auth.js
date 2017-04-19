import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error_code: 'Unauthorized',
          message: 'Sorry you don\'t have permission to perform this operation'
        });
      } else {
        req.decoded = decoded.data;
        next();
      }
    });
  } else {
    return res.status(401).send({
      error_code: 'Unauthorized',
      message: 'Sorry you don\'t have permission to perform this operation'
    });
  }
};
