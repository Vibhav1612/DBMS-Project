import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

// ... (existing imports and setup code)

const Home = () => {
  const { userId } = useParams();

  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'url("/image.webp") center center / cover no-repeat',
    backgroundSize: 'cover',
    color: '#fff',
  };

  const headingStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '5px',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  };

  const headingTextStyle = {
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'row', // Change to row
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  };

  const buttonColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
    flex: 1,
  };

  const buttonStyle = {
    margin: '10px',
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: 'rgba(230, 126, 34, 0.8)',
    color: '#fff',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>
        <h1 style={headingTextStyle}>Welcome to College Club Management System!!</h1>
      </div>

      <div style={buttonContainerStyle}>
        <div style={buttonColumnStyle}>
          <Link to="/club" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(211, 84, 0, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(230, 126, 34, 0.8)'}>
            Clubs
          </Link>

          <Link to={`/${userId}/user_clubs`} style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(211, 84, 0, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(230, 126, 34, 0.8)'}>
            User Clubs
          </Link>

          <Link to="/events" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(211, 84, 0, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(230, 126, 34, 0.8)'}>
            Events
          </Link>

          <Link to="/announcements" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(211, 84, 0, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(230, 126, 34, 0.8)'}>
            Announcements
          </Link>
        </div>

        <div style={buttonColumnStyle}>
          <Link to={`/${userId}/meetings`} style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(211, 84, 0, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(230, 126, 34, 0.8)'}>
            Meetings
          </Link>

          <Link to="/recruitments" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(211, 84, 0, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(230, 126, 34, 0.8)'}>
            Recruitments!
          </Link>

          <Link to="/seminars" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(211, 84, 0, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(230, 126, 34, 0.8)'}>
            Upcoming Seminars!!
          </Link>

          <Link to="/club_events_count" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(211, 84, 0, 0.8)'} onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(230, 126, 34, 0.8)'}>
            The number of events hosted by each Club!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
