var express = require('express');
var router = express.Router();

var ctrlPhotos = require('../controllers/photos');
var ctrlComments = require('../controllers/comment');

//get all photos uploaded
router.get('/photos', ctrlPhotos.photoList);
//upload a new photo
router.post('/photos', ctrlPhotos.uploadPhoto);
//get a single photo 
router.get('/photos/:photoid', ctrlPhotos.viewPhoto);
//edit photo caption
router.put('/photos/:photoid', ctrlPhotos.editCaption);
//delete photo
router.delete('/photos/:photoid', ctrlPhotos.deletePhoto);

//add a comment
router.post('photos/:photoid/comments', ctrlComments.createComment);
//edit comment
router.put('photos/:photoid/comments/:commendid', ctrlComments.editComment);
//delete comment
router.delete('photos/:photoid/comments/:commentid', ctrlComments.deleteComment);

module.exports = router;
