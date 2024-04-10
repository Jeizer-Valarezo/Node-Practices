const pgPromise =  require ("pg-promise");

const db = pgPromise()("postgres://postgres:Jeizer088366378@localhost:5432/video");

module.exports = { db };
