const mongoose = require('mongoose');

const rsfilesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User schema
  articleNumber: String,
  title: String,
  journalTitle: String,
  publicationDate: String,
  authors: String,
  impactFactor: String,
  journalQuartile: String,
  volume: String,
  indexing: String,
  journalWebsite: String,
  doiLink: String,
});

const rsfilesModel = mongoose.model('RevuesScientifiques', rsfilesSchema);
module.exports = rsfilesModel;
