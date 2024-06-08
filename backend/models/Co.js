const mongoose = require('mongoose');

const chapitreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User schema
  chapterNumber: String,
  title:  String,
  authors: String,
  publisher: String,
  publisherLink: String,
  edition: String,
  isbn: String,
  publicationDate: String,
});

const ChapitreModel = mongoose.model('chapitre', chapitreSchema);
module.exports = ChapitreModel;
