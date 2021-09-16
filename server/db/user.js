const Sequelize = require('sequelize');
const db = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;
const tokenSecret = process.env.JWT


const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  githubId: {
    type: Sequelize.INTEGER
  }
})

module.exports = User

User.prototype.correctPassword = function(candidatePwd) {
  console.log('correct password')
  return bcrypt.compare(candidatePwd, this.password)
}

User.prototype.generateToken = function() {
  console.log('in generate token')
  console.log('token secret', tokenSecret)
  console.log('this.id', this.id)
  return jwt.sign({ id: this.id}, tokenSecret)
  // console.log(token)
  // return token;
}

User.authenticate = async function({ username, password }) {
  const user = await this.findOne({where: { username }})
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken()
}

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

User.beforeCreate(async (user) => {
  const hashPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashPassword;
})

// const hashPassword = async(user) => {
//   if (user.changed('password')) {
//     user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
//   }
// }
