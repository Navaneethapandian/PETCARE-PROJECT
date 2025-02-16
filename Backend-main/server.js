const Express=require('express')
const Sql=require('mysql')
const Cors=require('cors')
const uuid=require('uuid');
const app=Express();
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt')
const port=process.env.PORT || 8081
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require("fs");
const path = require("path");
app.use('/uploads', Express.static('uploads'));
app.use(Express.json()); 
app.use(Cors())
app.use(bodyParser.urlencoded({ extended: true }));


const db=Sql.createConnection({
    host:'localhost',
    user:'root',
    port: 3306,
    password:"Test@123",
    database:'pet_adaption'

})


const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });


db.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Database connected successfully');
  
  });


  app.post('/register',async (req, res) => {
    console.log("post Connecion Success")
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const salt=10;
    const hashed=await bcrypt.hash(password,salt);


    
    const phone=req.body.phone;
    app.use(bodyParser.urlencoded({ extended: true }));

    db.query(
      'INSERT INTO pet_adaption.user (name, email, password,phone) VALUES (?, ?, ?,?)',
      [name, email, hashed,phone],
      (err, data) => {
          if (err) {
              console.log("Error executing query:", err); 
          }
  
          console.log("Query execution success");
          console.log(data)
          return res.status(200).json(data);
      }
  );
  
  });
  


  app.post('/loginform', async (req, res) => {
    console.log("Post Connection Success");

    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM pet_adaption.user WHERE email=?",
        [email],
        async (err, data) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (data.length > 0) {
                const dbPassword = data[0].password; // Get hashed password from database
                
                // Compare entered password with hashed password
                const isMatch = await bcrypt.compare(password, dbPassword);

                if (isMatch) {
                    console.log("Success");
                    return res.status(200).json({
                        status: "ok",
                        message: "Login successful",
                        email: email,
                    });
                } else {
                    console.log("Failure");
                    return res.status(401).json({
                        status: "failure",
                        message: "Invalid email or password",
                    });
                }
            } else {
                console.log("Failure");
                return res.status(401).json({
                    status: "failure",
                    message: "Invalid email or password",
                });
            }
        }
    );
});

app.get('/account', (req, res) => {

  const email = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  db.query("SELECT * FROM pet_adaption.user WHERE email = ?", [email], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
});



app.get("/adopt", (req, res) => {
  const status = req.query.status; 
  console.log(status);
  db.query("SELECT * FROM pets WHERE status=?", [status], (err, meta) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (meta.length > 0) {
    
      const updatedMeta = meta.map((pet) => {
        if (pet.image) {
          pet.image = Buffer.from(pet.image).toString("base64");
        }
        return pet;
      });
    
      return res.json(updatedMeta); 
    } else {
      return res.json([]); 
    }
  });
  
});

app.post('/petinfo', (req, res) => {
  const { Id } = req.body; 

  if (!Id) {
    return res.status(400).json({ message: 'Pet ID is required' });
  }


  const query = 'SELECT * FROM pets WHERE id = ?';

  db.query(query, [Id], (err, results) => {
    if (err) {
      console.error('Error fetching pet info:', err);
      return res.status(500).json({ message: 'Error fetching pet info' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const pet = results[0];


    const imageBase64 = pet.image ? Buffer.from(pet.image).toString('base64') : null;

    res.json({
      success: true,
      pet: {
        id: pet.id,
        name: pet.name,
        breed: pet.breed,
        gender: pet.gender,
        image: imageBase64, 
        description: pet.description,
        type: pet.type,
        age: pet.age,
      },
    });
  });
});



app.post('/ContactUs',(req,res)=>{
  const name=req.body.fullname;
  const email=req.body.email;
  const phone=req.body.phone;
  const feedback=req.body.address;
  db.query(
    'INSERT INTO pet_adaption.feedback (name, email,phone,address) VALUES (?, ?, ?,?)',
    [name, email, phone,feedback],
    (err, data) => {
        if (err) {
            console.log("Error executing query:", err); 
            return res.json(err)
        }
        console.log("Query execution success");
        return res.json(data);
    }
);

})

app.post('/myadoptions', (req, res) => {
  const { Email } = req.body; 
  console.log(Email);

  if (!Email) {
    return res.status(400).json({ error: "Email is required" });
  }


  const query = `
    SELECT 
      a.firstname AS first_name, 
      a.email AS adopter_email, 
      a.address AS adopter_address, 
      a.pet_id AS adopted_pet_id, 
      p.name, 
      p.breed, 
      p.age, 
      p.gender, 
      p.image AS pet_image, 
      a.created_at AS adoption_time 
    FROM adopters a 
    JOIN pets p ON a.pet_id = p.id 
    WHERE a.email = ?`;

  db.query(query, [Email], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (data && data.length > 0) {
      const result = data.map(item => ({
        ...item,
        pet_image: item.pet_image ? Buffer.from(item.pet_image).toString('base64') : null,
      }));
      return res.json(result);
    } else {
      return res.status(404).json({ error: "No adoptions found for this email." });
    }
  });
});

app.post('/adaption_verify', async (req, res) => {
  const { firstName, middleName, lastName, phoneNumber, email, address, pet_id } = req.body;

  console.log(req.body);

  if (!firstName || !lastName || !email || !phoneNumber || !address || !pet_id) {
    return res.status(400).json("Info Required");
  }

  db.query('SELECT * FROM user WHERE email=? OR phone=?', [email, phoneNumber], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Database Error");
    }

    if (data && data.length > 0) {
      db.query('SELECT id FROM user WHERE email=?', [email], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Failed to fetch user ID");
        }

        const userId = data[0].id;
        db.query(
          'INSERT INTO pet_adaption.adopters (firstname, middlename, lastname, email, phone, address, pet_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [firstName, middleName, lastName, email, phoneNumber, address, pet_id, userId],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json("Failed to Insert");
            }

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'muvarisamy@gmail.com',
                pass: 'tcdk ehox nxki ssfu', 
              },
            });

            const mailOptions = {
              from: 'muvarisamy@gmail.com',
              to: email,
              subject: 'Adoption Confirmation',
              text: 'Thank you for adopting a pet from us! We will Reach You in Few Days.Wish You a Happy New Year Ahead',
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Email error:', error);
                return res.status(500).json("Failed to send email");
              }

              console.log('Email sent: ' + info.response);

              const state = '1';
              db.query('UPDATE pets SET status=? WHERE id=?', [state, pet_id], (err) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json("Failed to Update Pet Status");
                }

                console.log('Pet status updated successfully');

             
                db.query('UPDATE user SET pets=pets+1 WHERE email=?', [email], (err) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json("Failed to Update User Pets Count");
                  }

                  console.log('User pets count updated successfully');
                 
                  return res.status(200).json("Adoption confirmed, email sent, and records updated!");
                });
              });
            });
          }
        );
      });
    } else {
      console.log('No user found');
      return res.status(404).json('User not found');
    }
  });
});

app.get('/pets', (req, res) => {
  const state='1';
  const query = 'SELECT * FROM pets where status=?';  
  db.query(query,[state],(err, results) => {
      if (err) {
          console.error('Error fetching pets:', err);
          return res.status(500).json({ message: 'Error fetching pet data' });
      }
      res.json(results); 
  });
});


app.get('/petsfree', (req, res) => {
  const state='0';
  const query = 'SELECT * FROM pets where status=?';  
  db.query(query,[state],(err, results) => {
      if (err) {
          console.error('Error fetching pets:', err);
          return res.status(500).json({ message: 'Error fetching pet data' });
      }
      res.json(results); 
  });
});


app.post("/add-pet", upload.single("image"), (req, res) => {
  try {
    const { name, age, breed, gender, description, petType } = req.body;

    if (!name || !age || !breed || !gender || !description || !petType) {
      return res.status(400).json({ message: "All fields except image are required." });
    }
    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;
    const petData = {
      name,
      age,
      breed,
      gender,
      description,
      petType,
      image: req.file ? imagePath : null,
    };

    console.log("Pet Data Received:", petData);

    db.query('INSERT INTO pets (name, age, breed, gender, description,pet_type, image) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [name, age, breed, gender, description, petType, petData.image], 
      (err, result) => {
        if (err) {
          console.error('Error inserting pet:', err);
          return res.status(500).json({ message: 'Error inserting pet' });
        }

      
        res.status(201).json({
          success: true,
          message: 'Pet added successfully',
          petId: result.insertId, 
          pet: petData, 
        });
      });

  } catch (err) {
    console.error("Error while adding pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/adopters", (req, res) => {
  const query = "SELECT * FROM adopters";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching adopters data:", err);
      return res.status(500).json({ message: "Error fetching adopters data" });
    }
    res.status(200).json(results);
  });
});

  app.listen(port,()=>{
    console.log("Running Successfully");
  })