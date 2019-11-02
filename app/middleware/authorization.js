const { ExtractJwt, JwtStrategy } = require('passport-jwt');
const axios = require('axios');
const { secret } = require('../config').server;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
      },
      async (payload, done) => {
        try {
          // const user = await User.findOne({ where: { id: payload.id } });
          // FIXME: Change the request URL to be dynamic rather than hard-coded
          const user = await axios.get(
            `http://localhost:8000/find/${payload.id}`,
          );
          if (Object.keys(user).includes('error'))
            return done('User not found.', false);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );
};
