const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('journal', {
  entry: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATEONLY
  }
})
