const items = require('../models/items');

const changeItem = (req, res, next) => {
  const { text, status } = req.body;
  return items.findByIdAndUpdate(req.body.id,
    { text, status },
    {
      runValidators: true,
      new: true,
    })
    .then(item => res.send({ data: item })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' })));
}

const getItems = (req, res, next) => {
  return items.find({})
    .then(item => res.send({ data: item }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const createItem = (req, res, next) => {
  const {
    name,
    mail,
    text,
    status,
  } = req.body;
  items.create({
    name,
    mail,
    text,
    status,
  })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new Error('Некоректные данные');
      }
      throw err;
    })
    .catch(next);
};

module.exports = {
  getItems,
  createItem,
  changeItem,
};