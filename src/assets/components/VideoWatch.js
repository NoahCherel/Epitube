import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const VideoWatch = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [similarVideos, setSimilarVideos] = useState(null);

  useEffect(() => {
    // Fetch video data for the specified videoId
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
        );
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    // Fetch comments for the specified videoId
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`
        );
        const data = await response.json();

        // Sort comments by like count in descending order
        const sortedComments = data.items.sort(
          (a, b) =>
            b.snippet.topLevelComment.snippet.likeCount -
            a.snippet.topLevelComment.snippet.likeCount
        );

        setComments(sortedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (showComments) {
      fetchComments();
    }
  }, [videoId, showComments]);

  useEffect(() => {
    // Fetch similar videos for the specified videoId
    const fetchSimilarVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=3&key=${API_KEY}`
        );
        const data = await response.json();
        setSimilarVideos(data.items);
      } catch (error) {
        console.error("Error fetching similar videos:", error);
      }
    };
  
    fetchSimilarVideos();
  }, [videoId]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!videoData) {
    return <div>Loading...</div>;
  }

  const video = videoData.items[0];

  // Split the description into lines
  const descriptionLines = video.snippet.description.split("\n");
  const firstTwoLines = descriptionLines.slice(0, 2).join("\n");
  const remainingLines = descriptionLines.slice(2).join("\n");

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex">
        <div className="aspect-w-16 aspect-h-9">
          <div style={{ height: "600px", width: "1200px" }}>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={parse(video.snippet.title)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="ml-8">
          <h2 className="text-xl font-bold">Similar Videos</h2>
          {similarVideos &&
            similarVideos.map((video) => (
              <div key={video.id.videoId} className="mb-4" style={{ width: "max-content" }}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-48 h-32"
                  />
                </a>
                <h3 className="text-lg font-medium mt-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {video.snippet.title}
                  </a>
                </h3>
                <p className="text-gray-500">{video.snippet.channelTitle}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="ml-8">
          <h1 className="text-2xl font-bold">{parse(video.snippet.title)}</h1>
          <p className="text-gray-500">{video.snippet.channelTitle}</p>
          <div className="mt-2">
            <p>{firstTwoLines}</p>
            {!showFullDescription && remainingLines && (
              <button
                className="text-blue-500 underline mt-2"
                onClick={toggleFullDescription}
              >
                Show More
              </button>
            )}
            {showFullDescription && remainingLines && (
              <>
                <p>{remainingLines}</p>
                <button
                  className="text-blue-500 underline mt-2"
                  onClick={toggleFullDescription}
                >
                  Show Less
                </button>
              </>
            )}
          </div>
        </div>
      <div className="mt-8">
        <button className="text-blue-500 underline" onClick={toggleComments}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {showComments && comments && (
          <>
            <h2 className="text-xl font-bold mt-4">Comments</h2>
            {comments.map((comment) => {
              const userProfileImageUrl =
                comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
  
              return (
                <div key={comment.id} className="mt-4 border-b border-gray-300">
                  <div className="flex items-center">
                    {userProfileImageUrl && (
                      <img
                        src={userProfileImageUrl}
                        alt="User Profile"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <p>
                      {parse(
                        comment.snippet.topLevelComment.snippet.textDisplay
                      )}
                    </p>
                  </div>
                  <p className="text-gray-500 mt-2">
                    - {comment.snippet.topLevelComment.snippet.authorDisplayName}
                    - {comment.snippet.topLevelComment.snippet.publishedAt}
                    - {comment.snippet.topLevelComment.snippet.likeCount} likes
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoWatch;
