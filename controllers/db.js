const pgPromise = require("pg-promise");

const pgp = pgPromise();

const db = pgp("postgres://postgres:Jeizer088366378@localhost:5432/video");

const setupDb = async () => {
  try {
    await db.none(`
        DROP TABLE IF EXISTS planets;
  
        CREATE TABLE planets (
          id SERIAL NOT NULL PRIMARY KEY,
          name TEXT NOT NULL,
          image TEXT
        );

        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        token TEXT
        );

      `);

    await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
    await db.none(
      `INSERT INTO users (username, password) VALUES ('dummy', 'dummy')`
    );

    console.log("Database setup completed");
  } catch (error) {
    console.error("Error setting up database:", error.message);
  }
};


module.exports = { db, setupDb };
