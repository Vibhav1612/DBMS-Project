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

// Register

//////////////////////////////////////////////////////////

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
          const userId = selectResult[0] ? selectResult[0].user_id : null; 
          console.log("User registered successfully. UserID:", userId);
          res.status(200).json({ userId, message: "User registered successfully" });
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////


// Registering Clubs for users

//////////////////////////////////////////////////////////////

import util from 'util';  


const queryAsync = util.promisify(db.query).bind(db); 

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
      
      
      const clubData = rows;
      console.log('ClubData', clubData)
      clubIds.push(clubData.clubid);
      console.log(clubIds)
    }

    if (!Array.isArray(clubIds)) {
      throw new Error("Invalid data received from the database");
    }

    const validClubIds = clubIds.filter((clubId) => clubId !== null);

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



///////////////////////////////////////////////////////////////

//Login

///////////////////////////////////////////////////

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT user_id FROM users WHERE email = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error during login", error: err });
      } else {
        if (result.length > 0) {
          console.log(result)
          const userId = result[0].user_id;
          console.log(userId)
          res.status(200).json({ userId, message: "Login successful" });
        } else {
          res.status(401).json({ message: "Wrong username/password!" });
        }
      }
    }
  );
});

//////////////////////////////////////////////////////////


// Clubs with category filtering

///////////////////////////////////////////////////////


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


//////////////////////////////////////////////////////////

// Events


/////////////////////////////////////////////////////////////

app.get('/events', (req, res) => {
  const query = 'SELECT * FROM EVENT WHERE DATE_TIME > CURTIME()';
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});


/////////////////////////////////////////////////////////

// Announcements

//////////////////////////////////////////////////////////

app.get('/announcements', (req, res) => {
  const query = 'SELECT * FROM ANNOUNCEMENT';
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

///////////////////////////////////////////////////////////


// Recruitments

///////////////////////////////////////////////////////////

app.get('/recruitments', (req, res) => {
  const searchTerm = 'recruit'; 

  db.query('CALL SelectAnnouncementsWithSearchTerm(?)', [searchTerm], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data[0]); 
  });
});

/////////////////////////////////////////////////////



// Seminars

//////////////////////////////////////////////////////


app.get('/seminars', (req, res) => {
  const searchTerm = 'seminar'; 

  db.query('CALL SelectAnnouncementsWithSearchTerm(?)', [searchTerm], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data[0]); 
  });
});


//////////////////////////////////////////////////////


// Retrieving the number of events hosted by each club

///////////////////////////////////////////////////////

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



///////////////////////////////////////////////////////


// Retrieving club_specific meetings for users

////////////////////////////////////////////////////////

app.get('/:userId/meetings', async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await queryAsync('SELECT * FROM meetings WHERE Club_ID IN (SELECT ClubID FROM Club_User WHERE User_ID = ?)', [userId]);
    res.json(response);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ message: 'Error fetching meetings' });
  }
});


//////////////////////////////////////////////////////////


// Creation of meeting for users

///////////////////////////////////////////////////////////

app.post('/:userId/meetings', async (req, res) => {
  const userId = req.params.userId;
  const { agenda, date_time } = req.body;

  try {
    const clubQuery = 'SELECT ClubID FROM Club_User WHERE User_ID = ? LIMIT 1';
    const [clubResult] = await queryAsync(clubQuery, [userId]);
    console.log(clubResult)

    if (!clubResult) {
      return res.status(404).json({ message: 'User is not part of any clubs' });
    }

    const clubId = clubResult.ClubID;

    // Use the dynamically obtained club ID in the INSERT query
    const meetingQuery = 'INSERT INTO meetings (Date_Time, Agenda, Club_ID) VALUES (?, ?, ?)';
    await queryAsync(meetingQuery, [date_time, agenda, clubId]);

    res.json({ message: 'Meeting created successfully' });
  } catch (error) {
    console.error("Error creating meeting in backend:", error);
    res.status(500).json({ message: 'Error creating meeting backend' });
  }
});

/////////////////////////////////////////////////////////

// Updating meetings

/////////////////////////////////////////////////////////

app.put('/:userId/meetings/:meetingId', async (req, res) => {
  const userId = req.params.userId;
  const meetingId = req.params.meetingId;
  const { agenda, date_time } = req.body;

  console.log(agenda, date_time)

  try {
    const query = 'UPDATE meetings SET Agenda = ?, Date_Time = ? WHERE Meeting_ID = ? AND Club_ID IN (SELECT ClubID FROM Club_User WHERE User_ID = ?)';
    await queryAsync(query, [agenda, date_time, meetingId, userId]);
    res.json({ message: 'Meeting updated successfully' });
  } catch (error) {
    console.error("Error updating meeting:", error);
    res.status(500).json({ message: 'Error updating meeting' });
  }
});



/////////////////////////////////////////////////////////

// Deleting meetings


/////////////////////////////////////////////////////////


app.delete('/:userId/meetings/:meetingId', async (req, res) => {
  const userId = req.params.userId;
  const meetingId = req.params.meetingId;

  try {
    const query = 'DELETE FROM meetings WHERE Meeting_ID = ? AND Club_ID IN (SELECT ClubID FROM Club_User WHERE User_ID = ?)';
    await queryAsync(query, [meetingId, userId]);
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ message: 'Error deleting meeting' });
  }
});

/////////////////////////////////////////////////////////


// Retrieving clubs the user is part of


/////////////////////////////////////////////////////////

app.get('/:userId/user_clubs', (req, res) => {
  const userId = req.params.userId;

  console.log(userId);

  const query = 'CALL GetUserClubs(?)';

  db.query(query, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user clubs', error: err });
    }
    return res.json(data[0]); 
  });
});


/////////////////////////////////////////////////////////







app.listen(4400, () => {
  console.log('Backend connection successful!');
});
