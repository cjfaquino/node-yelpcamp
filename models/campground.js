const mongoose = require("mongoose")

//SCHEMA
const campgroundSchema = new mongoose.Schema({
	name: String,
	price: { type: Number, min: 0 },
	image: String,
	location: String,
	lat: Number,
	lng: Number,
	description: String,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		firstName: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

module.exports = mongoose.model('Campground', campgroundSchema);
