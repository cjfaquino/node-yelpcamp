const express = require('express'),
	router = express.Router(),
	middleware = require('../middleware'),
	Campground = require('../models/campground');

//INDEX
router.get('/', function (req, res) {
	Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allCampgrounds, currentUser: req.user, page: 'campgrounds' });
		}
	});
});

//CREATE
router.post('/', middleware.isLoggedIn, function (req, res) {
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let price = req.body.price;
	let author = {
		id: req.user._id,
		firstName: req.user.firstName,
	};
	let newCamp = { name: name, price: price, image: image, description: desc, author: author };
	Campground.create(newCamp, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

//NEW
router.get('/new', middleware.isLoggedIn, function (req, res) {
	res.render('campgrounds/new');
});

//SHOW
router.get('/:id', function (req, res) {
	Campground.findById(req.params.id)
		.populate('comments')
		.exec(function (err, foundCampground) {
			if (err) {
				console.log(err);
			} else {
				res.render('campgrounds/show', { campground: foundCampground });
			}
		});
});

//EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findById(req.params.id, function (err, foundCampground) {
		res.render('campgrounds/edit', { campground: foundCampground });
	});
});

//UPDATE
router.put('/:id', middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
		err,
		updatedCampgrounds
	) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//DESTORY
router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			req.flash('success', "Successfully deleted");
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;