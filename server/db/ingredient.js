const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('ingredient', {
  itemName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})
