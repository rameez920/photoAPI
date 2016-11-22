//schema for mongo database
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now
	},
	content: {
		type: String,
		required: true
	},
	upVotes: {
		type: Number,
		"default": 0
	}
});

var photoSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	image: {
		type: Buffer,
		required: true
	}, 
	uploadedOn: {
		type: Date,
		"default": Date.now
	},
	
	comments: [commentSchema]
});

mongoose.model("PhotoDB", photoSchema);