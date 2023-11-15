// frontend/src/components/UserClubs.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserClubs = () => {
  const { userId } = useParams();
  const [userClubs, setUserClubs] = useState([]);

  useEffect(() => {
    const fetchUserClubs = async () => {
      try {
        const response = await axios.get(`http://localhost:4400/${userId}/user_clubs`);
        setUserClubs(response.data);
      } catch (error) {
        console.error('Error fetching user clubs:', error);
      }
    };

    fetchUserClubs();
  }, [userId]);

  return (
    <div style={containerStyle}>
      <h2>Your Clubs:</h2>
      <ul style={listStyle}>
        {userClubs.map((club) => (
          <li key={club.clubid} style={clubItemStyle}>
            <strong>{club.ClubName}</strong> - Club ID: {club.clubid}
          </li>
        ))}
      </ul>
    </div>
  );
};

const containerStyle = {
  textAlign: 'center',
  padding: '20px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const listStyle = {
  listStyle: 'none',
  padding: '0',
};

const clubItemStyle = {
  backgroundColor: '#f4f4f4',
  border: '1px solid #ccc',
  borderRadius: '5px',
  margin: '10px 0',
  padding: '10px',
  width: '300px',
  textAlign: 'left',
};

export default UserClubs;
