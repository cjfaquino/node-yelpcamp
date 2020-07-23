const express = require('express'),
	  router = express.Router(),
	  passport = require('passport'),
	  User = require('../models/user');

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
	User.register(new User({ username: req.body.username }), req.body.password, function (
		err,
		user
	) {
		if (err) {
			req.flash('error', err.message);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function () {
			req.flash('success', "Welcome to YelpCamp " + user.username);
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

module.exports = router;