const db = require('./database');
const User = require('./user');
const Book = require('./book');
const Journal = require('./journal');


// Not sure this current structure is going to work
Book.belongsTo(User);
User.hasMany(Book);

Journal.belongsTo(Book);
Book.hasMany(Journal);

module.exports = {
  db,
  User,
  Book,
  Journal
}
