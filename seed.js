const { green, red } = require('chalk');
const db = require('./server/db/database');
const Ingredient = require('./server/db/ingredient');
const User = require('./server/db/user');

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log('db synced!')

    const ingredient1 = await Ingredient.create({
      itemName: 'flour'
    })
    const user1 = await User.create({
      id: 1,
      username: 'Preston',
      password: 'fun'
    })

    console.log('seeded successfully')
  } catch (err) {
    console.log(red(err));
  }
};

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

module.exports = seed;
