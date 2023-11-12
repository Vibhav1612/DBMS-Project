import React, { useState, useEffect } from "react";
import axios from "axios";

const Recruitment = () => {
  const [recruitments, setRecruitments] = useState([]);

  useEffect(() => {
    // Fetch all recruitments when the component mounts.
    fetchAllRecruitments();
  }, []);

  const fetchAllRecruitments = async () => {
    try {
      const res = await axios.get("http://localhost:4400/recruitments");
      setRecruitments(res.data);
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
      <h1 style={{ fontSize: "24px" }}>Here are all the clubs recruiting!</h1>
      <div className="recruitments">
        {recruitments.map((recruitment) => (
          <div key={recruitment.announcement_ID} className="recruitment" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{recruitment.Title}</p>
            <span style={{ fontSize: "14px" }}>Date: {formatDate(recruitment.Date)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recruitment;
