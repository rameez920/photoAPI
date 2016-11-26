var mongoose = require('mongoose');
var db = mongoose.model('PhotoDB');
var fs = require('fs');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

function buildPhotoList(result) {
	var photoList = [];

	results.forEach(function(doc) {
		photoList.push({
			image: doc.obj.image,
			author: doc.obj.author,
			uploadedOn: doc.obj.uploadedOn
		});
	}); 
	return photoList;
};

module.exports.photoList = function(req, res) {
	
	db.find({}, function(err, result) {
		if (err) {
			console.log('db error:', err);
      		sendJSONresponse(res, 404, err);
		} else {
			var photos = buildPhotoList(result);
			sendJSONresponse(res, 200, photos);
		}
	}); 
};

module.exports.uploadPhoto = function(req, res) {
	console.log(req.body.user);
	console.log(req.file);

	var photoBuffer = fs.readFileSync(req.file.path);	
	
	db.create({
		user: req.body.user,
		image: photoBuffer
	}, function(err, photoUpload) {
		if (err) {
			console.log(err);
			sendJSONresponse(res, 400, err);
		} else {
			console.log(photoUpload);
			sendJSONresponse(res, 201, photoUpload);
		}
	});
};

module.exports.viewPhoto = function(req, res) {

};

module.exports.editCaption = function(req, res) {

};

module.exports.deletePhoto = function(req, res) {

};

module.exports.countVote = function(req, res) {

};