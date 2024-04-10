const pgPromise = require('pg-promise');

const pgp = pgPromise();

const db = pgp("postgres://postgres:Jeizer088366378@localhost:5432/video");

module.exports = db;
