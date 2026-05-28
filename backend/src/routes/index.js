const router = require('express').Router();
const { errors } = require('celebrate');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-error');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

router.use(errors());

module.exports = router;
