import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const VideoWatch = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // Fetch video data for the specified videoId
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDifHOaaMTvscYgkTErGeUt_hIUfBVJvEs`
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
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyDifHOaaMTvscYgkTErGeUt_hIUfBVJvEs`
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
      <div className="mt-4">
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
