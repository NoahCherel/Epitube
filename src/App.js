import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./assets/components/NavBar";
import SideBar from "./assets/components/SideBar";
import ContentArea from "./assets/components/ContentArea";
import VideoWatch from "./assets/components/VideoWatch";

function App() {
  return (
    <Router>
      <div className="bg-yt-body h-screen min-h-screen">
        <NavBar />
        <div className="grid grid-cols-5 gap-2">
          <SideBar />
          <Routes>
            <Route path="/" element={<ContentArea />} />
            <Route path="/watch/:videoId" element={<VideoWatch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
