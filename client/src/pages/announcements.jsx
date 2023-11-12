import React, { useState, useEffect } from "react";
import axios from "axios";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch all announcements when the component mounts.
    fetchAllAnnouncements();
  }, []);

  const fetchAllAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:4400/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to format the date
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1 style={{ fontSize: "24px" }}>List of All Announcements!</h1>
      <div className="announcements">
        {announcements.map((announcement) => (
          <div key={announcement.announcement_ID} className="announcement" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{announcement.Title}</p>
            <span style={{ fontSize: "14px" }}>{announcement.Content}</span>
            <br />
            <span style={{ fontSize: "14px" }}>Date: {formatDate(announcement.Date)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
