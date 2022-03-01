const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // eslint-disable-line
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '60c602f6dda3c7daf710dde1');
  } catch (e) {
    return next('Необходима авторизация');
  }

  req.user = payload;

  next();
};