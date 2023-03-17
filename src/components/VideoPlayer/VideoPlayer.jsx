import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const savedTime = localStorage.getItem("videoTime") || 0;
  const savedLesson = localStorage.getItem("currentLesson") || 0;
  const [currentLesson, setCurrentLesson] = useState(savedLesson);

  const saveProgress = (videoTime, currentLesson) => {
    localStorage.setItem("videoTime", videoTime);
    localStorage.setItem("currentLesson", currentLesson);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (savedTime) {
      video.currentTime = savedTime;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    video.addEventListener("timeupdate", () => {
      saveProgress(video.currentTime, currentLesson);
    });

    video.addEventListener("ended", () => {
      saveProgress(0, currentLesson + 1);
      setCurrentLesson(currentLesson + 1);
    });
  }, [src, currentLesson, savedTime]);

  return <video className="w-full rounded" ref={videoRef} controls />;
};

export default VideoPlayer;
