import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./assets/components/NavBar";
import SideBar from "./assets/components/SideBar";
import ContentArea from "./assets/components/ContentArea";
import VideoWatch from "./assets/components/VideoWatch";
import Search from "./assets/components/Search";
import jwt_decode from 'jwt-decode';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState("");

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }

  const handleLogout = () => {
    setUser({});
    setProfilePicture("");
  }  

  function handleCallback(response) {
    var userObj = jwt_decode(response.credential);
    console.log(userObj);
    setUser(userObj);
    setProfilePicture(userObj.picture);
    document.getElementById("signin-button").style.display = "none";
  }  

useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
        client_id: '951940055752-ps8lcicssf641em99cqdroue6bje2rj1.apps.googleusercontent.com',
        callback: handleCallback,
    });

    google.accounts.id.renderButton(
        document.getElementById("signin-button"),
        {
            theme: "filled_black",
            size: "large",
            text: "signin_with",
        }
    );
  }, []);

  return (
    <Router>
      <div className="bg-yt-body h-screen min-h-screen flex flex-col">
        <NavBar toggleSidebar={toggleSidebar} profilePicture={profilePicture} />
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
