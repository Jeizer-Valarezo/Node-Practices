const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const SECRET = process.env.SECRET;
console.log("Valor de secretKey:", secretKey);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', jwt_payload.id);
    if (!user) {
      return done(new Error('User not found.'));
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
