import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContentArea = () => {
  return (
    <main className="col-span-4 block">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <VideoList />
      </div>
    </main>
  );
};

export default ContentArea;

const VideoTile = ({ video }) => {
  const { title, channelTitle, thumbnails } = video.snippet;

  return (
    <Link to={`/watch/${video.id}`} className="flex flex-col">
      <img
        className="w-full object-cover h-40"
        src={thumbnails.medium.url}
        alt={title}
      />
      <div className="flex flex-row mt-2">
        <img
          src={thumbnails.default.url}
          alt={channelTitle}
          className="rounded-full h-10 w-10"
        />
        <div className="flex flex-col">
          <span className="text-white font-medium px-2">{title}</span>
          <span className="text-gray-500 font-base text-xs px-2">
            {channelTitle}
          </span>
        </div>
      </div>
    </Link>
  );
};

const VideoList = () => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    // Fetch recommended video data from YouTube API
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=4&key=AIzaSyBpmvu_96PkMADl8FaGnhzXzdzRAd095cI"
        );
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, []);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 m-4">
      {videoData.items.map((video) => (
        <VideoTile key={video.id} video={video} />
      ))}
    </div>
  );
};
