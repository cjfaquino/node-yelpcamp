const express = require('express'),
	  router = express.Router(),
	  passport = require('passport'),
	  User = require('../models/user'),
	  Campground = require('../models/campground');

//Root
router.get('/', function (req, res) {
	res.render('landing');
});

// ==========AUTH ROUTES
//Register
router.get('/register', function (req, res) {
	res.render('register', {page: 'register'});
});

//Sign up logic
router.post('/register', function (req, res) {
	User.register(new User({ username: req.body.username, firstName: req.body.firstName }), req.body.password, function (
		err,
		user
	) {
		if (err) {
			req.flash('error', err.message);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function () {
			req.flash('success', "Welcome to YelpCamp, " + user.firstName);
			res.redirect('/campgrounds');
		});
	});
});

//Login
router.get('/login', function (req, res) {
	res.render('login', {page: 'login'});
});

//Login Logic
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login',
	}),
	function (req, res) {}
);

//logout
router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success', "Logged you out");
	res.redirect('/campgrounds');
});

//User profile
router.get('/users/:id', function(req, res) {
	User.findById(req.params.id, function(err, foundUser){
		if(err) {
			req.flash('error', "Something went wrong.")
			res.redirect('/campgrounds')
		} else {
			Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
				if(err) {
					req.flash('error', "Something went wrong.")
					res.redirect('/campgrounds')
				} else {
				res.render('users/show', {user: foundUser, campgrounds: campgrounds})
				}
			})
			
		}
	})
})

module.exports = router;