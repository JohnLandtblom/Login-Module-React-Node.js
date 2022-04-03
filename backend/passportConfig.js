const User = require("./user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        //
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  passport.serializeUser((user, next) => {
    // determines wich data the user object should store in the session, in this
    next(null, user.id); // case the users id is provided as the key
  });
  passport.deserializeUser((id, next) => {
    // corresponds to the key of the user object, and matches it with the object to find the users details

    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      next(err, userInformation);
    });
  });
};
