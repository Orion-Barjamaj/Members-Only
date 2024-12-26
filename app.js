const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function getPgVersion() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT version()');
        console.log(result.rows[0]);
    } finally {
        client.release();
    } 
}

pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection error:', err.stack));

getPgVersion();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({ 
    secret: "keyboard cat", 
    resave: false, 
    saveUninitialized: false, 
    cookie: { maxAge: 7500000 },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/src'));

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (!match) {
          return done(null, false, { message: "Incorrect password" })
        }  
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

app.get("/", (req, res) => res.render("index"));

const signUp = require('./routes/signUpRoute');
const homePage = require('./routes/homepage');
const logIn = require('./routes/logIn');
const addMessage = require('./routes/addMeassageRoute');
const becomeMember = require('./routes/becomeMember');
app.use('/', signUp);
app.use('/', homePage);
app.use('/', logIn);
app.use('/', addMessage);
app.use('/', becomeMember);

app.listen(3000, () => console.log("app listening on port 3000!"));