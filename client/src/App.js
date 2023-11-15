import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Replace Redirect with Navigate
import Club from "./pages/club";
import Event from "./pages/events";
import Announcement from "./pages/announcements";
import Home from "./pages/home";
import Recruitment from "./pages/recruitments";
import Seminar from "./pages/seminars";
import ClubEventsCount from "./pages/count_events";
import Register from "./pages/register";
import ClubRegistration from "./pages/register_clubs";
import Meetings from "./pages/meetings";
import UserClubs from "./pages/userClubs";

import './styles.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Use Navigate for redirection */}
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/:userId" element={<Home />} />
          <Route path="/club" element={<Club />} />
          <Route path="/events" element={<Event />} />
          <Route path="/:userId/user_clubs/" element={<UserClubs />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/recruitments" element={<Recruitment />} />
          <Route path="/seminars" element={<Seminar />} />
          <Route path="/club_events_count" element={<ClubEventsCount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:userId/register_clubs" element={<ClubRegistration />} />
          <Route path="/:userId/meetings" element={<Meetings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
