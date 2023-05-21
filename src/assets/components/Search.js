import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";
import "tailwindcss/tailwind.css";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Search = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch YouTube videos based on the search query
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${searchTerm}&chart=mostPopular&maxResults=9`
        );
        const data = await response.json();
        setSearchResults(data.items);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results for "{searchTerm}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div className="bg-white p-4 rounded shadow" key={result.id.videoId}>
              <Link to={`/watch/${result.id.videoId}`}>
                <h3 className="text-xl font-bold mb-2">{parse(result.snippet.title)}</h3>
                <img
                  className="w-full mb-2"
                  src={result.snippet.thumbnails.high.url}
                  alt={parse(result.snippet.title)}
                />
              </Link>
            </div>
          ))
        ) : (
          <p>No search results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
