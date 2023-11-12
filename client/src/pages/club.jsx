import React, { useState, useEffect } from "react";
import axios from "axios";

const Club = () => {
  const [clubs, setClubs] = useState([]);
  const [category, setCategory] = useState(""); // State to store the category input.

  useEffect(() => {
    // Fetch all clubs when the component mounts.
    fetchAllClubs();
  }, []);

  const fetchAllClubs = async () => {
    try {
      const res = await axios.get("http://localhost:4400/club");
      setClubs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategorySearch = async () => {
    try {
      const res = await axios.get(`http://localhost:4400/club?category=${category}`);
      setClubs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1 style={{ fontSize: "24px" }}>Here are the clubs of the college!</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "5px" }}
        />
        <button
          onClick={handleCategorySearch}
          style={{
            padding: "5px 10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      <div className="clubs">
        {clubs.map((club) => (
          <div key={club.ClubId} className="club" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{club.ClubName}</p>
            <span style={{ fontSize: "14px" }}>{club.Description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Club;
