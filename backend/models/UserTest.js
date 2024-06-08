const mongoose = require('mongoose');

const UserTestSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  password: String,
  role: String,
  dblplink: String,
  //fichie indivudual
  namear:  String,
  birthDate:  String ,
  gender:  String, enum: ['female', 'male'] ,
  cinNumber:  String ,
  passportNumber:  String ,
  cnrpsMatricule:  String ,
  establishment:  String ,
  grade:  String ,
  since:  String ,

  lastDegree:  String ,
  degreeDate:  String ,
  degreeEstablishment:  String ,
  // Additional fields for doctrine role
  researchSubject:  String ,
  progressRate:  String ,
  firstYearRegistration:  String ,
  university:  String ,
  thesisDirector:  String ,
  
}
);

const UserTestModel = mongoose.model('Users', UserTestSchema);
module.exports = UserTestModel;
