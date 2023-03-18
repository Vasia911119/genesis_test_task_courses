import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import axios from "axios";

const VideoPlayer = ({
  videoUrl,
  progress,
  params,
  setProgress,
  muted,
  controls,
  hover,
  viewSpeedbar,
}) => {
  const videoRef = useRef(null);
  const [available, setAvailable] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (!videoUrl) {
      setAvailable(false);
    }
    if (videoUrl) {
      axios
        .head(videoUrl)
        .then((response) => {
          if (response.status === 200) {
            setAvailable(true);
          } else {
            setAvailable(false);
          }
        })
        .catch(() => {
          setAvailable(false);
        });
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
        // hls.on(Hls.Events.MANIFEST_PARSED, () => {
        //   videoRef.current.play();
        // });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoUrl;
        // videoRef.current.addEventListener("loadedmetadata", () => {
        //   videoRef.current.play();
        // });
      }
      if (
        progress &&
        videoRef.current &&
        progress.currentTime &&
        !isNaN(progress.currentTime)
      ) {
        videoRef.current.currentTime = progress.currentTime;
      }
      const handleKeyDown = (event) => {
        if (event.altKey && event.key === "1") {
          videoRef.current.playbackRate = Math.min(
            videoRef.current.playbackRate + 0.25,
            3
          );
        } else if (event.altKey && event.key === "2") {
          videoRef.current.playbackRate = Math.max(
            videoRef.current.playbackRate - 0.25,
            0.25
          );
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      setPlaybackRate(videoRef.current.playbackRate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef.current ? videoRef.current.playbackRate : null]);

  useEffect(() => {
    if (hover && videoRef.current) {
      videoRef.current.play();
    } else if (!hover && videoRef.current) {
      videoRef.current.pause();
    }
  }, [hover]);

  const handleVideoTimeUpdate = () => {
    if (setProgress && videoRef.current) {
      setProgress({
        ...progress,
        currentTime: Math.floor(videoRef.current.currentTime),
      });
    }
  };

  const handleVideoEnded = () => {
    if (setProgress) {
      setProgress({
        courseId: params.courseId,
        lastLessonId: null,
        currentTime: 0,
      });
    }
  };

  const handleVideoPause = () => {
    if (setProgress && videoRef.current) {
      setProgress({
        ...progress,
        currentTime: Math.floor(videoRef.current.currentTime),
      });
    }
  };

  return (
    <>
      {!available && (
        <p className="text-center font-bold text-red-600">
          Video not available
        </p>
      )}
      <video
        className="w-full rounded"
        ref={videoRef}
        controls={controls}
        muted={muted}
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleVideoEnded}
        onPause={handleVideoPause}
      />
      {viewSpeedbar && (
        <div className="mt-2 xl:flex xl:flex-row-reverse xl:justify-around">
          <div className="flex justify-end">
            <p className=" text-yellow-300">Current video speed:</p>
            <p className="ml-2 rounded-full bg-yellow-300 text-blue-500 px-2 font-bold ">
              {playbackRate}x
            </p>
          </div>
          <p className="text-slate-400">
            You can change the video viewing speed. To increase speed press
            <span className="ml-1 text-yellow-300">Alt+1</span>, to decrease
            <span className="ml-1 text-yellow-300">Alt+2</span>
          </p>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
