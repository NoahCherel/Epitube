import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { YouTube } from "../icons/YouTube";
import HamBurger from "../icons/HamBurger";
import SearchIcon from "../icons/Search";
import Create from "../icons/Create";
import MenuIcon from "../icons/MenuIcon";
import Search from "./Search";

import NotificationIcon from "../icons/NotificationIcon";

const NavBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const apiKey = 'AIzaSyBpmvu_96PkMADl8FaGnhzXzdzRAd095cI'; // Replace with your actual API key
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${apiKey}`
      );
      const data = await response.json();
      setSearchResults(data.items);
      navigate(`/search/${searchTerm}`);
    } catch (error) {
      console.log('Error searching videos:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-yt-nav h-16 block shadow-none">
      <span className="text-2xl text-white bold">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-1 bg-yt-nav h-screen">
            <div className="text-white p-4">
              <div className="flex flex-row">
                <span className="mr-8 px-6" onClick={props.toggleSidebar}>
                  <HamBurger/>
                </span>
                <span>
                  <YouTube />
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-3 p-4 text-center">
            <div className="flex flex-row justify-center">
              <input
                className="placeholder-gray-500 w-3/5 bg-yt-insideBox text-yt-textBox text-base h-8 px-2 inline-block"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
              />
              <button
                className="bg-yt-searchButton h-8 w-16 text-center px-2 text-base flex justify-center"
                onClick={handleSearch}
              >
                <SearchIcon />
              </button>
            </div>
          </div>
          <div className="col-span-1 p-4 flex flex-end justify-end">
            <div className="flex flex-row">
              <Create />
              <MenuIcon />
              <NotificationIcon />
              {/* Implement a google Sign in icon here with react google login */}
            </div>
          </div>
        </div>
      </span>
      {/* Render the search results */}
      {searchResults && searchResults.length > 0 && <Search searchResults={searchResults} />}
    </div>
  );
};

export default NavBar;

