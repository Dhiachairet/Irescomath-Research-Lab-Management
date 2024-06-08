const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserTestModel = require('./models/UserTest')
const router = express.Router();
const RS = require('./models/RS');

const cfilesModel = require('./models/C');
const ChapitreModel = require('./models/Co');
const app = express();
const axios = require('axios');
const { parseString } = require('xml2js');
const xml2js = require('xml2js');

const jwt=require("jsonwebtoken");
const rsfilesModel = require("./models/RS");
const demandModel = require("./models/demand");
const PendingModel = require("./models/pendingusers");
const JWT_SECRET="qsdfazerty"


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/UserTest")


//post rs
app.post('/addpub', async (req, res) => {
    try {
      const { userId, ...formData } = req.body; 
      const newRS = await rsfilesModel.create({ userId, ...formData }); 
      res.status(201).json(newRS); 
    } catch (err) {
      res.status(400).json({ error: err.message }); // 400 status for bad request
    }
  });

 // Backend code - /insert_articles endpoint
 app.post('/insert_articles', async (req, res) => {
  try {
    const articles = req.body.articles; 
    const userID = req.body.userID; 
    

    // Insert each article into the database with the correct userId
    const insertedArticles = await Promise.all(
      articles.map(async (article) => {
        // Include userId when creating the article
        const newArticle = await rsfilesModel.create({ ...article, userId: userID }); 
        return newArticle;
      })
    );

    res.status(201).json(insertedArticles); // Return the inserted articles
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});




  
//display rs
app.get('/getpub', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const _id = decoded.userID; 

        const userPublications = await rsfilesModel.find({ userId: _id });
        res.json(userPublications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//adminrs
app.get('/getAllRS', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const isAdmin = decoded.role === 'admin'; // Assuming admin role is checked in the JWT payload

        if (!isAdmin) {
            return res.status(403).json({ error: 'Forbidden' }); // Return 403 for unauthorized access
        }

        const allRS = await rsfilesModel.find({}); // Fetch all Revues Scientifiques
        res.json(allRS);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



    // Backend API for adding conference
app.post('/addconf', async (req, res) => {
    try {
        const {userId, ...formData } = req.body;
        const newConference = await cfilesModel.create({ userId, ...formData });
        res.status(201).json(newConference); // 201 status for successful creation
    } catch (err) {
        res.status(400).json({ error: err.message }); // 400 status for bad request
    }
});
 // Backend code - /insert_articles endpoint
 app.post('/insert_inproceeding', async (req, res) => {
  try {
    const confe = req.body.confe; 
    const userID = req.body.userID; 
   

    // Insert each article into the database with the correct userId
    const insertedInproceeding = await Promise.all(
      confe.map(async (confe) => {
        // Include userId when creating the article
        const newInproceeding = await cfilesModel.create({ ...confe, userId: userID }); 
        return newInproceeding;
      })
    );

    res.status(201).json(insertedInproceeding); // Return the inserted articles
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});





// Backend API for retrieving conferences
app.get('/getconf',async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const _id = decoded.userID; 
    const userConferences = await cfilesModel.find({userId: _id});
    res.json(userConferences);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});
//adminconf
app.get('/getAllConf', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const isAdmin = decoded.role === 'admin'; // Assuming admin role is checked in the JWT payload

        if (!isAdmin) {
            return res.status(403).json({ error: 'Forbidden' }); // Return 403 for unauthorized access
        }

        const allConf = await cfilesModel.find({}); // Fetch all Revues Scientifiques
        res.json(allConf);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Backend API for adding chapitre d'ouvrage
app.post('/addchapitre', async (req, res) => {
    try {
        const {userId, ...formData } = req.body;
        const newChapitre = await ChapitreModel.create({ userId, ...formData });
        res.status(201).json(newChapitre); 
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});
// Backend API for retrieving chapitre d'ouvrage entries
app.get('/getchapitre', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const _id = decoded.userID; 
    const userChapitre = await ChapitreModel.find({userId: _id});
    res.json(userChapitre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//adminchapitre
app.get('/getAllchapitre', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const isAdmin = decoded.role === 'admin'; // Assuming admin role is checked in the JWT payload

        if (!isAdmin) {
            return res.status(403).json({ error: 'Forbidden' }); // Return 403 for unauthorized access
        }

        const allChapitre = await ChapitreModel.find({}); // Fetch all Revues Scientifiques
        res.json(allChapitre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//post demand
app.post('/adddemand', async (req,res)=> {
    
    try {
        const { userId, ...formData } = req.body; 
      const newDem = await demandModel.create({ userId, ...formData }); 
      res.status(201).json(newDem); 


    }
    catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});
//display demand 
app.get('/getdemand' , async (req , res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const _id = decoded.userID; 
        
        const userDemands = await demandModel.find({ userId: _id});
        res.json(userDemands);
     }catch (err) {
        res.status(500).json({ error: err.message });
    }

});
//admin demand
app.get('/getAlldemand', async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const isAdmin = decoded.role === 'admin'; // Assuming admin role is checked in the JWT payload

      if (!isAdmin) {
          return res.status(403).json({ error: 'Forbidden' }); // Return 403 for unauthorized access
      }

      const alldemand = await demandModel.find({}); // Fetch all Revues Scientifiques
      res.json(alldemand);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

//update demand
app.put('/updatedemn/:id', (req , res) => {
    const { id } = req.params;
    const { name , equipement , debut, fin } = req.body;
    demandModel.findByIdAndUpdate(id,{ name , equipement , debut, fin }, { new:true})
    .then(updatedem => {
        if (!updatedem){
            return res.status(404).json({error: " demand not found"});
        }
        res.json(updatedem);
    })
    .catch (err => res.status(500).json({error :err.message}));

});
//delete demand
app.delete('/deletedem/:id', async (req,res)=> {
 const { id } = req.params;
 demandModel.findByIdAndDelete(id)
 .then (deletedem => {
    if (!deletedem){
        return res.status(404).json({ error: "Demand not found" });

    }
    res.json ({ message: "demand deleted successfully"});
 })
 .catch (err => res.status(500).json({ error: err.message }));
});



//registerapi
app.post('/register', async (req, res) =>{

    

  try {
    const { email, name, phone, password, role } = req.body;
    const newUser = new PendingModel({ email, name, phone, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
//registerforadmin
app.post('/registerAdmin', async (req, res) =>{

    

  try {
    const { email, name, phone, password, role } = req.body;
    const newUser = new UserTestModel({ email, name, phone, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
//get pedding users 
app.get('/pending-users', async (req, res) => {
  try {
    const pendingUsers = await PendingModel.find();
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).send('Error fetching pending users');
  }
});
//approveuser
app.post('/approve-user/:id', async (req, res) => {
  try {
    const pendingUser = await PendingModel.findById(req.params.id);
    if (!pendingUser) {
      return res.status(404).send('User not found');
    }

    const newUser = new UserTestModel({
      name: pendingUser.name,
      email: pendingUser.email,
      phone: pendingUser.phone,
      password: pendingUser.password,
      role: pendingUser.role,
    });

    await newUser.save();
    await PendingModel.findByIdAndDelete(req.params.id);
    res.status(200).send('User approved');
  } catch (error) {
    res.status(500).send('Error approving user');
  }
});
//denyuser
app.post('/deny-user/:id', async (req, res) => {
  try {
    await PendingModel.findByIdAndDelete(req.params.id);
    res.status(200).send('User denied');
  } catch (error) {
    res.status(500).send('Error denying user');
  }
});



//loginapi
app.post("/login",(req, res) => {
    const {email, password} = req.body;
    UserTestModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password ===password){
                const token=jwt.sign
                ({ email: user.email,
                     role: user.role,
                     userID: user._id
                    }, JWT_SECRET);
                    return res.status(201).json({ status: "ok", data: token });
                  } else {
                      return res.status(400).json({ error: "Mot de passe incorrect" });
                  }
              } else {
                  return res.status(400).json({ error: "Aucun compte avec cet e-mail n'existe" });
              }
          })
          .catch(err => res.status(500).json({ error: "Erreur serveur" }));
  });

//display
app.get('/getUsers', (req,res) =>{
    UserTestModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err) )
    }) 

    
    // Update user API
app.put('/updateUser/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, role } = req.body;

    UserTestModel.findByIdAndUpdate(id, { name, email, phone, password, role }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(updatedUser);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
//update rs
app.put('/updateRS/:id',  (req, res) => {
    const { id } = req.params;
    const { articleNumber, title, journalTitle, publicationDate, authors, impactFactor, journalQuartile, volume, indexing, journalWebsite, doiLink } = req.body;
    rsfilesModel.findByIdAndUpdate(id,{ articleNumber, title, journalTitle, publicationDate, authors, impactFactor, journalQuartile, volume, indexing, journalWebsite, doiLink }, {new:true})
   .then(updateRs => {
    if(!updateRs){
        return res.status(404).json({error: " rs not found"});
    }
    res.json(updateRs);
   })
   .catch (err => res.status(500).json({error :err.message}));
});
//update conf
app.put('/updateconf/:id',  (req, res) => {
    const { id } = req.params;
    const { articleNumber, publicationtitle, authors, conferencetitle, conferencesite, editor, editorlink, edition,  isbn, pubdata } = req.body;
    cfilesModel.findByIdAndUpdate(id,{ articleNumber, publicationtitle, authors, conferencetitle, conferencesite, editor, editorlink, edition,  isbn, pubdata }, {new:true})
   .then(updateconf => {
    if(!updateconf){
        return res.status(404).json({error: " conf not found"});
    }
    res.json(updateconf);
   })
   .catch (err => res.status(500).json({error :err.message}));
});
//update chapitre
app.put('/updatechap/:id',  (req, res) => {
    const { id } = req.params;
    const { chapterNumber, title, authors, publisher,  publisherLink, edition,  isbn, publicationDate } = req.body;
    ChapitreModel.findByIdAndUpdate(id,{ chapterNumber, title, authors, publisher,  publisherLink, edition,  isbn, publicationDate }, {new:true})
   .then(updatechap => {
    if(!updatechap){
        return res.status(404).json({error: " chap not found"});
    }
    res.json(updatechap);
   })
   .catch (err => res.status(500).json({error :err.message}));
});
//delete user api
app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;
  
    UserTestModel.findByIdAndDelete(id)
      .then(deletedUser => {
        if (!deletedUser) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
  //delete rs 
  app.delete('/deleteRS/:id', async (req, res) => {
    const { id } = req.params;
  
       rsfilesModel.findByIdAndDelete(id)
       .then(deletedRS => {
        if (!deletedRS){
            return res.status(404).json({ error: "Revues Scientifique not found" });

        }
        res.json({ message: "rs deleted successfully" });
      }) 
       .catch (err => res.status(500).json({ error: err.message }));
  });
  

  
   //delete conf
   app.delete('/deleteconf/:id', async (req, res) => {
    const { id } = req.params;
  
       cfilesModel.findByIdAndDelete(id)
       .then(deletedConf => {
        if (!deletedConf){
            return res.status(404).json({ error: "conferences not found" });

        }
        res.json({ message: "conference deleted successfully" });
      }) 
       .catch (err => res.status(500).json({ error: err.message }));
  });


   //delete chap
   app.delete('/deletechap/:id', async (req, res) => {
    const { id } = req.params;
  
       ChapitreModel.findByIdAndDelete(id)
       .then(deletedChap => {
        if (!deletedChap){
            return res.status(404).json({ error: "chapitre not found" });

        }
        res.json({ message: "chapitre deleted successfully" });
      }) 
       .catch (err => res.status(500).json({ error: err.message }));
  });
  

//profile
app.post("/profile", async (req, res) => {
    const { token } = req.body;
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const useremail = decoded.email;
      const user = await UserTestModel.findOne({ email: useremail });
      if (user) {
        const { name, email, phone,password, role,_id,namear,birthDate,gender,cinNumber,passportNumber,cnrpsMatricule,establishment,grade,since,lastDegree,degreeDate,degreeEstablishment,researchSubject,progressRate,firstYearRegistration,university,thesisDirector,dblplink} = user;
        res.json({ status: "ok", data: { name, email, phone,password, role,_id,namear,birthDate,gender,cinNumber,passportNumber,cnrpsMatricule,establishment,grade,since,lastDegree,degreeDate,degreeEstablishment,researchSubject,progressRate,firstYearRegistration,university,thesisDirector,dblplink },token:req.body.token, dblplink });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  //updateprofile
//updateprofile
app.put("/updateProfile", async (req, res) => {
    const { token, userData } = req.body;
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const useremail = decoded.email;
  
      // Construct the update object dynamically based on userData
      const updateObj = {
        $set: userData // Set all fields from userData
      };
  
      const updatedUser = await UserTestModel.findOneAndUpdate(
        { email: useremail },
        updateObj, // Use the dynamically constructed update object
        { new: true } // To return the updated document
      );
  
      if (updatedUser) {
        res.json({ status: "ok", updatedData: updatedUser });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
//sidebar
app.post("/sidebar", async (req, res)=>{
  
    
    const { token } = req.body;
   
    try{
        
        const user = jwt.verify(token, JWT_SECRET);
     
        const useremail=user.email;
        UserTestModel.findOne({email : useremail})
        .then((data) =>{
            res.send({ status: "ok",data: data });
        })
        .catch((error) => {
            res.send({ status: "error",data: error});

        });
    } catch(error){

    }

});

      






function formatAuthors(authorsArray) {
    return authorsArray.map(author => author._).join(', ');
}
    app.get('/get_publications', async (req, res) => {
        const URL = 'https://dblp.org/pid/173/2959.xml';
        try {
          const response = await axios.get(URL);
          
          const xmlData = response.data;
      

        parseString(xmlData, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error parsing XML' });
            }
            const publications = [];
            const dblpPerson = result['dblpperson'];
            if (dblpPerson) {
                const publicationsArray = dblpPerson['r'];
                publicationsArray.forEach(rElem => {
                    const publication = {};
                    let title, authors, journalTitle, doiLink;
                    if (rElem['article']) {
                        title = rElem['article'][0]['title'];
                        authors = formatAuthors(rElem['article'][0]['author']);
                        journalTitle = rElem['article'][0]['journal'];
                        doiLink = rElem['article'][0]['ee'];
                     
                     
                    } else if (rElem['inproceedings']) {
                        title = rElem['inproceedings'][0]['title'];
                        authors = formatAuthors(rElem['inproceedings'][0]['author']);
                        journalTitle = rElem['inproceedings'][0]['booktitle'];
                        doiLink = rElem['inproceedings'][0]['ee'];
                    }
                  
                    publication['title'] = title || 'Title Not Available';
                    publication['authors'] = authors || 'Authors Not Available';
                    publication['journalTitle'] = journalTitle || 'journalTitle Not Available';
                    publication['doiLink'] = doiLink || 'DOI Not Available';
                   
                    publications.push(publication);
                });
              res.json(publications);
            } else {
              res.status(404).json({ error: 'dblpperson element not found' });
            }
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

      //articles only
      app.get('/get_articles', async (req, res) => {
        const { url } = req.query;

        if (!url) {
          return res.status(400).json({ error: 'DBLP XML link is required' });
        }
      
        try {
          const response = await axios.get(url);
          const xmlData = response.data;
      
          parseString(xmlData, (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Error parsing XML' });
            }
      
            const articles = [];
            const dblpPerson = result['dblpperson'];
            if (dblpPerson) {
              const publicationsArray = dblpPerson['r'];
              publicationsArray.forEach(rElem => {
                if (rElem['article']) {
                  const publication = {
                    title: rElem['article'][0]['title'] || 'Title Not Available',
                    authors: formatAuthors(rElem['article'][0]['author']) || 'Authors Not Available',
                    journalTitle: rElem['article'][0]['journal'] || 'journalTitle Not Available',
                    doiLink: rElem['article'][0]['ee'] || 'DOI Not Available',
                    publicationDate: rElem['article'][0]['year'] || 'Year not Available'
                  };
                  articles.push(publication);
                 
                  
                }
              });
              res.json(articles);
            } else {
              res.status(404).json({ error: 'dblpperson element not found' });
            }
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

//inproceeding only
app.get('/get_inproceedings', async (req, res) => {
  const URL = 'https://dblp.org/pid/201/4062.xml';
  try {
    const response = await axios.get(URL);
    const xmlData = response.data;

    parseString(xmlData, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error parsing XML' });
      }

      const inproceedings = [];
      const dblpPerson = result['dblpperson'];
      if (dblpPerson) {
        const publicationsArray = dblpPerson['r'];
        publicationsArray.forEach(rElem => {
          if (rElem['inproceedings']) {
            const publication = {
                publicationtitle: rElem['inproceedings'][0]['title'] || 'Title Not Available',
              authors: formatAuthors(rElem['inproceedings'][0]['author']) || 'Authors Not Available',
              conferencetitle: rElem['inproceedings'][0]['booktitle'] || 'journalTitle Not Available',
              editorlink: rElem['inproceedings'][0]['ee'] || 'DOI Not Available',
              pubdata:rElem['inproceedings'][0]['year'] || 'Year not Available'
            };
            inproceedings.push(publication);
          }
        });
        res.json(inproceedings);
      } else {
        res.status(404).json({ error: 'dblpperson element not found' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//getuserandpubs
app.get('/getUsersWithPublications', async (req, res) => {
  try {
    const users = await UserTestModel.find();
    const userPublications = await Promise.all(users.map(async (user) => {
      const rsPublications = await rsfilesModel.find({ userId: user._id });
      const conferencePublications = await cfilesModel.find({ userId: user._id });
      const chapitrePublications = await ChapitreModel.find({ userId: user._id });
      return {
        user,
        rsPublications,
        conferencePublications,
        chapitrePublications,

      };
    }));

    res.json(userPublications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

















app.listen(3001, () => {
    console.log("server is running")
})