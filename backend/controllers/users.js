const users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;

const getUserInfo = (req, res, next) => {
    users.findById(req.user._id)
        .orFail('не найдено')
        .then((user) => res.send(user))
        .catch((err) => {
            if (err.message === 'PageNotFound') {
                throw new Error('Страница не найдена');
            }
            if (err.name === 'CastError') {
                throw new Error('Невалидные значения');
            }
            throw err;
        })
        .catch(next);
};

const createUser = (req, res, next) => {
    const {
        name, password,
    } = req.body;
    users.findOne({ name })
        .then((user) => {
            if (user) {
                throw new Error('Пользователь с таким логином уже зарегистрирован');
            } return bcrypt.hash(password, SALT_ROUNDS);
        })
        .then((hash) => users.create({
            name,
            password: hash,
        }))
        .then(() => res.send({
            data: {
                name,
            },
        }))
        .catch((err) => {
            throw err;
        })
        .catch(next);
};

const login = (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) {
        console.log('rrr');
    }
    return users.findOne({ name }).select('+password')
        .then((user) => {
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        console.log('rrr');
                    } else {
                        const token = jwt.sign({ _id: user._id }, '60c602f6dda3c7daf710dde1', { expiresIn: '7d' });
                        return res.send({ token, message: 'Всё верно!' });
                    }
                });
        })
        .catch(next);
};

module.exports = {
    createUser,
    login,
    getUserInfo,
};