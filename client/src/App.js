import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Club from "./pages/club";
import Event from "./pages/events";
import Announcement from "./pages/announcements";
import Home from "./pages/home";
import Recruitment from "./pages/recruitments";
import Seminar from "./pages/seminars";
import ClubEventsCount from "./pages/count_events";
import Register from "./pages/register";
import ClubRegistration from "./pages/register_clubs"; // Import the ClubRegistration component
import Meetings from "./pages/meetings";

import './styles.css'; // Import your CSS file

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Update the path for the Home route to include :userId */}
          <Route path="/:userId" element={<Home />} />

          <Route path="/club" element={<Club />} />
          <Route path="/events" element={<Event />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/recruitments" element={<Recruitment />} />
          <Route path="/seminars" element={<Seminar />} />
          <Route path="/club_events_count" element={<ClubEventsCount />} />
          <Route path="/register" element={<Register />} />

          {/* Add the route for ClubRegistration */}
          <Route path="/:userId/register_clubs" element={<ClubRegistration />} />
          <Route path="/:userId/meetings" element={<Meetings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
