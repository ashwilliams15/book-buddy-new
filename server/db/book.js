const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('book', {
  rating: {
    type: Sequelize.INTEGER
  },
  dateStarted: {
    type: Sequelize.DATEONLY
  },
  datFinished: {
    type: Sequelize.DATEONLY
  },
  favQuote: {
    type: Sequelize.STRING
  },
  pages: {
    type: Sequelize.INTEGER
  }
})
