import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';





function Meetings() {
  const { userId } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [agenda, setAgenda] = useState('');
  const [date_time, setDate_time] = useState('');


  // Fetch user's meetings on component mount
  useEffect(() => {
    
    fetchMeetings();

  }, [userId]);


  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`http://localhost:4400/${userId}/meetings`);
      // console.log('In this')
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleCreateMeeting = async () => {
    try {
      await axios.post(`http://localhost:4400/${userId}/meetings`, { agenda, date_time });
      setAgenda(''); // Clear the agenda input after creating a meeting
      setDate_time(''); // Clear the date_time input after creating a meeting
      fetchMeetings(); // Refresh the meetings list
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };
  

  const handleUpdateMeeting = async (meetingId, newAgenda, newDate_time) => {
    try {
      await axios.put(`http://localhost:4400/${userId}/meetings/${meetingId}`, { agenda: newAgenda, date_time: newDate_time });
      fetchMeetings(); // Refresh the meetings list
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };
  

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`http://localhost:4400/${userId}/meetings/${meetingId}`);
      fetchMeetings(); // Refresh the meetings list
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  return (
    <div className="Meetings">
      <h1>User Meetings</h1>

      {/* Display meetings */}
      <ul>
      {meetings.map((meeting) => (
  <li key={meeting.Meeting_ID}>
    <span>Agenda: {meeting.Agenda}</span>
    <span>Date_Time: {meeting.Date_Time}</span>
    <button onClick={() => {
      const newAgenda = prompt('Enter new agenda:', meeting.Agenda);
      const newDate_time = prompt('Enter new Date_Time:', meeting.Date_Time);
      handleUpdateMeeting(meeting.Meeting_ID, newAgenda, newDate_time);
    }}>
      Update
    </button>
    <button onClick={() => handleDeleteMeeting(meeting.Meeting_ID)}>
      Delete
    </button>
  </li>
))}



      </ul>

      {/* Create new meeting form */}
      <div>
  <label>Agenda:</label>
  <input type="text" value={agenda} onChange={(event) => setAgenda(event.target.value)} />
  <label>Date_Time:</label>
  <input type="datetime-local" value={date_time} onChange={(event) => setDate_time(event.target.value)} />
  <button onClick={handleCreateMeeting}>Create Meeting</button>
</div>

    </div>
  );
}

export default Meetings;
