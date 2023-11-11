import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vibhav123',
  database: 'club_management',
  Promise: global.Promise

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
  const username = req.body.username;
  const password = req.body.password;

  // Perform INSERT
  db.query("INSERT INTO users(email, password) VALUES(?, ?)", [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
    } else {
      // Perform SELECT to get the updated user_id
      db.query("SELECT user_id FROM users WHERE email = ?", [username], (selectErr, selectResult) => {
        if (selectErr) {
          console.error(selectErr);
          res.status(500).json({ message: "Error retrieving user_id" });
        } else {
          const userId = selectResult[0] ? selectResult[0].user_id : null; // Check if selectResult[0] is defined
          console.log("User registered successfully. UserID:", userId);
          res.status(200).json({ userId, message: "User registered successfully" });
        }
      });
    }
  });
});



import util from 'util';  // Import the util module

// ...

const queryAsync = util.promisify(db.query).bind(db);  // Promisify the query method

app.post("/:userId/register_clubs", async (req, res) => {
  const userId = req.params.userId;
  const { clubs } = req.body;
  console.log(clubs)

  try {
    const clubIds = [];

    for (const clubName of clubs) {
      // Use the promisified query method
      const [rows] = await queryAsync('SELECT clubid FROM club WHERE ClubName = ?', [clubName]);
      console.log(typeof rows)

      if (!rows || typeof rows !== 'object' || !('clubid' in rows) || typeof rows.clubid === 'undefined') {
        console.error(`Invalid data received from the database for club '${clubName}'`);
        continue; // Skip to the next iteration if data is invalid
      }
      
      
      console.log('Illi')
      const clubData = rows;
      console.log('ClubData', clubData)
      clubIds.push(clubData.clubid);
      console.log(clubIds)
    }

    // Ensure that clubIds is an array before trying to filter and map
    if (!Array.isArray(clubIds)) {
      throw new Error("Invalid data received from the database");
    }

    const validClubIds = clubIds.filter((clubId) => clubId !== null);

    // Ensure that validClubIds is an array before trying to map
    if (!Array.isArray(validClubIds)) {
      throw new Error("Invalid data received from the database");
    }

    await Promise.all(validClubIds.map(async (clubId) => {
      await db.query('INSERT INTO Club_User (User_ID, ClubID) VALUES (?, ?)', [userId, clubId]);
    }));

    res.json({ message: 'Clubs registered successfully' });
  } catch (error) {
    console.error("Error during club registration here:", error);
    res.status(500).json({ message: "Error during club registration" });
  }
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
