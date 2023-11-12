import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ClubRegistration() {
  const { userId } = useParams(); // Extract userId from the route parameters
  const [clubs, setClubs] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const navigate = useNavigate();

  const handleClubRegistration = () => {
    const clubList = clubs.split(',').map(club => club.trim());

    axios.post(`http://localhost:4400/${userId}/register_clubs`, {
      clubs: clubList,
    }).then((response) => {
      console.log(response);
      setRegistrationStatus(response.data.message);

      // Redirect to /userId after successful registration
      navigate(`/${userId}`);
    }).catch((error) => {
      console.error("Error during club registration:", error);
      setRegistrationStatus("Error during club registration");
    });
  };

  return (
    <div className="ClubRegistration">
      <h1>Club Registration</h1>
      <label>Enter the clubs you are part of (comma-separated):</label>
      <input type="text" value={clubs} onChange={(event) => setClubs(event.target.value)} />
      <button onClick={handleClubRegistration}>Register Clubs</button>
      <h2>{registrationStatus}</h2>
    </div>
  );
}

export default ClubRegistration;
