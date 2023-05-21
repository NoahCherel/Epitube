import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const ContentArea = () => {
  return (
    <main className="col-span-4 block">
      <span className="text-white font-medium text-2xl px-4 py-2">
        Recommended
      </span>
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
        src={thumbnails.high.url}
        alt={title}
      />
      <div className="flex flex-row mt-2">
        <img
          src={thumbnails.high.url}
          alt={channelTitle}
          className="rounded-full h-10 w-10"
        />
        <div className="flex flex-col">
          <span className="text-white font-medium px-2">{parse(title)}</span>
          <span className="text-gray-500 font-base text-xs px-2">
            {parse(channelTitle)}
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
          "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=12&key=AIzaSyDifHOaaMTvscYgkTErGeUt_hIUfBVJvEs"
        );
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, []);

  if (!videoData || !videoData.items) {
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
