import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vibhav123',
  database: 'club_management'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully');
  }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('This is the backend server');
});

app.get('/club', (req, res) => {
  const { category } = req.query;

  let query;

  if (category) {
    query = `
      SELECT club.*
      FROM club
      INNER JOIN club_category ON club.clubid = club_category.Club_id
      INNER JOIN category ON club_category.category_id = category.category_id
      WHERE category.category_name = ?;
    `;

    db.query(query, [category], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  } else {
    // If no category is provided, fetch all clubs.
    query = 'SELECT * FROM CLUB';
    db.query(query, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  }
});

app.get('/events', (req, res) => {
  const query = 'SELECT * FROM EVENT WHERE DATE_TIME > CURTIME()';
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/announcements', (req, res) => {
  const query = 'SELECT * FROM ANNOUNCEMENT';
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/recruitments', (req, res) => {
  const searchTerm = 'recruit'; 

  db.query('CALL SelectAnnouncementsWithSearchTerm(?)', [searchTerm], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data[0]); 
  });
});


app.get('/seminars', (req, res) => {
  const searchTerm = 'seminar'; 

  db.query('CALL SelectAnnouncementsWithSearchTerm(?)', [searchTerm], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data[0]); 
  });
});

app.get('/club_events_count', (req, res) => {
  const query = `
    SELECT club.clubid, club.ClubName, (
      SELECT COUNT(*) FROM event WHERE event.club_id = club.clubid
    ) AS event_count
    FROM club
  `;

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/register", (req, res) => {
  const username = req.body.username; // Adjusted to match the frontend
  const password = req.body.password;

  db.query("INSERT INTO users(email,password) VALUES(?,?)", [username, password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error registering user" });
    } else {
      res.status(200).json({ message: "User registered successfully" });
    }
  });
});

app.post("/register_clubs/:userId", (req, res) => {
  const userId = req.params.userId;
  const { clubs } = req.body;

  // Assuming 'clubs' is an array of club names
  // Iterate through the clubs and insert into Club_User table
  clubs.forEach((club) => {
    db.query(
      "INSERT INTO Club_User (UserID, ClubName) VALUES (?, ?)",
      [userId, club],
      (err, result) => {
        if (err) { 
          console.log(err);
        }
      }
    );
  });

  res.json({ message: 'Clubs registered successfully' });
});



app.post("/login",(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;

  db.query("SELECT * FROM users WHERE email = ? AND password = ?",
  [username,password],
  (err,result)=>{
    if(err){
    res.send({err:err})
    }

    if(result.length > 0){
      res.send(result);
    }else{
      res.send({message:"Wrong username/password!"});
      }
    }
  );
});




app.listen(4400, () => {
  console.log('Backend connection successful!');
});
