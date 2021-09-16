const {expect} = require('chai');
const User = require('../server/db/user');
const jwt = require('jsonwebtoken');
const seed = require('../seed');

describe('User model', () => {
  let users;
  beforeEach(async() => {
    users = (await seed()).users
  })

  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async() => {
        const token = await users.Preston.generateToken();
        const { id } = await jwt.verify(token, process.env.JWT);
        expect(id).to.equal(users.Preston.id);
      })
    });
    describe('authenticate', () => {
      let user;
      beforeEach(async() => user = await User.create({
        username: 'Ashley',
        password: 'oats'
      }))
      describe('with correct credentials', () => {
        it('returns a token', async() => {
          const token = await User.authenticate({
            username: 'Ashley',
            password: 'oats'
          })
          expect(token).to.be.ok
        })
      });
      describe('with incorrect credentials', () => {
        it('throws a 401', async() => {
          try {
            await User.authenticate({
              username: 'blah',
              password: 'blee'
            })
            throw 'Incorrect username/password'
          } catch (ex) {
            expect(ex.status).to.equal(401)
          }
        })
      })
    })
  })
})
