const mongoose = require('mongoose');

const cfilesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User schema
  articleNumber: String,
  publicationtitle:  String,
  authors: String,
  conferencetitle: String,
  conferencesite: String,
  editor: String,
  editorlink: String,
  edition: String,
  isbn: String,
  pubdata: String,
});

const cfilesModel = mongoose.model('conference', cfilesSchema);
module.exports = cfilesModel;
