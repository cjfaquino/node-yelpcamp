const express = require('express'),
  app = express(),
  flash = require('connect-flash'),
  request = require('request'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  User = require('./models/user'),
  seedDB = require('./seeds'),
  PORT = process.env.PORT || 8080,
  dotenv = require('dotenv').config();

const commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

const database = process.env.DATABASEURL || 'mongodb://localhost:27017/yelp_camp';
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB!'))
  .catch((error) => console.log(error.message));

app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); //Seed the database

//===PASSPORT CONFIG
app.use(
  require('express-session')({
    secret: 'sketchy',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
