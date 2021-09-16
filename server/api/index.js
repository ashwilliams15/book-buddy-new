const router = require('express').Router();
const Ingredient = require('../db/ingredient');
const User = require('../db/user');

router.get('/pantry', async (req, res, next) => {
  try {
    const result = await Ingredient.findAll();
    res.send(result)
  } catch (err) {
    next(err)
  }
});

router.post('/pantry', async (req, res, next) => {
  try {
    res.status(201).send(await Ingredient.create(req.body))
  } catch (err) {
    next(err)
  }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    res.send({ token: await User.authenticate(req.body)})
  } catch (err) {
    next(err)
  }
})

router.post('/auth/signup', async (req, res, next) => {
  try {
    console.log('in sign up post server side')
    const user = await User.create(req.body)
    res.send({ token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/auth/me', async (req, res, next) => {
  try {
    console.log('why am I getting hit?')
    const result = await User.findByToken(req.headers.authorization)
    console.log('RESULT', result)
    res.send(result);
  } catch (ex) {
    console.log('this is the ERRORR ')
    next(ex)
  }
})
// router.delete()


module.exports = router;
