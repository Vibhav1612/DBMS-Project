import React, { useState, useEffect } from "react";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch all events when the component mounts.
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get("http://localhost:4400/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to format the date and time
  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(dateTime).toLocaleString(undefined, options);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1 style={{ fontSize: "24px" }}>List of All Events!</h1>
      <div className="events">
        {events.map((event) => (
          <div key={event.Event_ID} className="event" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{event.Title}</p>
            <span style={{ fontSize: "14px" }}>{event.Description}</span>
            <br />
            <span style={{ fontSize: "14px" }}>Location: {event.Location}</span>
            <br />
            <span style={{ fontSize: "14px" }}>Date/Time: {formatDateTime(event.Date_Time)}</span>
            <br />
            <span style={{ fontSize: "14px" }}>Club ID: {event.Club_ID}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
