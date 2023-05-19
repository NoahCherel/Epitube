import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoWatch = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    // Fetch video data for the specified videoId
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyBpmvu_96PkMADl8FaGnhzXzdzRAd095cI`
        );
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  const video = videoData.items[0];

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Render the video player */}
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.snippet.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {/* Render the video details */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{video.snippet.title}</h1>
        <p className="text-gray-500">{video.snippet.channelTitle}</p>
        <p className="mt-2">{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoWatch;
