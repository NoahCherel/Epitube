import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./assets/components/NavBar";
import SideBar from "./assets/components/SideBar";
import ContentArea from "./assets/components/ContentArea";
import VideoWatch from "./assets/components/VideoWatch";
import Search from "./assets/components/Search";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Router>
      <div className="bg-yt-body h-screen min-h-screen flex flex-col">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          {sidebarVisible && <SideBar />}
          <Routes>
            <Route path="/" element={<ContentArea />} />
            <Route path="/watch/:videoId" element={<VideoWatch />} />
            <Route path="/search/:searchTerm" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
