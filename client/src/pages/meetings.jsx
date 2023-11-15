import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Meetings() {
  const { userId } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [agenda, setAgenda] = useState('');
  const [date_time, setDate_time] = useState('');

  useEffect(() => {
    fetchMeetings();
  }, [userId]);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`http://localhost:4400/${userId}/meetings`);
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleCreateMeeting = async () => {
    try {
      await axios.post(`http://localhost:4400/${userId}/meetings`, { agenda, date_time });
      setAgenda('');
      setDate_time('');
      fetchMeetings();
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handleUpdateMeeting = async (meetingId, newAgenda, newDate_time) => {
    try {
      await axios.put(`http://localhost:4400/${userId}/meetings/${meetingId}`, { agenda: newAgenda, date_time: newDate_time });
      fetchMeetings();
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`http://localhost:4400/${userId}/meetings/${meetingId}`);
      fetchMeetings();
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>User Meetings</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {meetings.map((meeting) => (
          <li key={meeting.Meeting_ID} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <div>
              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Agenda:</span>
              <span>{meeting.Agenda}</span>
            </div>
            <div>
              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Date_Time:</span>
              <span>{new Date(meeting.Date_Time).toLocaleString()}</span>
            </div>
            <div>
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
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
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
