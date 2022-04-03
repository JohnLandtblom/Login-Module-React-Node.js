const mongoose = require("mongoose"); // Updates backend server
const express = require("express"); // Libary for Node.js
const cors = require("cors"); // Allows to make requests from one server to another
const passport = require("passport"); //Authentication middleware for Node, using username, password etc
const passportLocal = require("passport-local").Strategy; // authenticates users using a username and password.
const cookieParser = require("cookie-parser"); // a middleware which parses cookies attached to the client request objec
const bcrypt = require("bcryptjs"); // allows to build a password security platform, hashes every password
const session = require("express-session"); // used to create and manage a session middleware
const bodyParser = require("body-parser"); // npm library used to process data sent through an HTTP request body

const app = express();
const User = require("./user");
// End of imports
mongoose.connect(
  "mongodb+srv://PassportAuth:12345@cluster0.rmwyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

// Middleware - Has acess to the request object (req), tge resopnse object(res) and the next middleware function in the
// applications request response cycle
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4000", // <-- location of were the react app is connected
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode")); // Sets the cookie
app.use(passport.initialize()); // initialises the authentication from passport
app.use(passport.session()); // takes the object and changes the 'user' value that is currently the session -
require("./passportConfig")(passport); // -id (from the client cookie)

//END OF MIDDLEWARE

// Routes
app.post("/login", (req, res, next) => {
  // Checks if user exists
  passport.authenticate("local", (err, user) => {
    if (err) throw err;
    if (!user) res.send("User does not exist");
    // No success
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Authenticated Successfully"); // Success
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("An user with the same credentials already exists"); // Checks credentials exist
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Krypterar lösenordet i servern

      const newUser = new User({
        // Creates new user
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      await newUser.save();
      res.send("New user created");
    }
  });
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user (name, username,pw)that has been authenticated inside of it.
});
//END OF ROUTES

//Start Server
app.listen(4000, () => {
  // Backend server
  console.log("Server Has Started");
});
