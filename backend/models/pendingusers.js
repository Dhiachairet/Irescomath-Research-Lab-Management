// models/PendingUser.js
const mongoose = require('mongoose');

const PendingUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  role: String,
  
 
});

const PendingModel = mongoose.model('PendingUser', PendingUserSchema);
module.exports = PendingModel;
