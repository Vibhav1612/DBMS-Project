import React, { useState, useEffect } from "react";
import axios from "axios";

const Seminar = () => {
  const [seminars, setseminars] = useState([]);

  useEffect(() => {
    // Fetch all seminars when the component mounts.
    fetchAllseminars();
  }, []);

  const fetchAllseminars = async () => {
    try {
      const res = await axios.get("http://localhost:4400/seminars");
      setseminars(res.data);
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
      <h1 style={{ fontSize: "24px" }}>Here are all the upmcoming seminars!</h1>
      <div className="seminars">
        {seminars.map((seminar) => (
          <div key={seminar.announcement_ID} className="seminar" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{seminar.Title}</p>
            <span style={{ fontSize: "14px" }}>Date: {formatDate(seminar.Date)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seminar;
