import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import axios from "axios";
import styles from "./VideoPlayer.module.css";

export const VideoPlayer = ({
  videoUrl,
  progress,
  setProgress,
  muted,
  controls,
  hover,
  viewSpeedbar,
  pictureInPicture,
}) => {
  const params = useParams();
  const videoRef = useRef(null);
  const [available, setAvailable] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);

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
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoUrl;
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
        if (event.ctrlKey && event.altKey && event.key === "1") {
          videoRef.current.playbackRate = Math.min(
            videoRef.current.playbackRate + 0.25,
            3
          );
        } else if (event.ctrlKey && event.altKey && event.key === "2") {
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
      const currentTime = Math.floor(videoRef.current.currentTime);
      setProgress({
        ...progress,
        currentTime,
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
      const currentTime = Math.floor(videoRef.current.currentTime);
      setProgress({
        ...progress,
        currentTime,
      });
    }
  };

  const handlePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      setIsPictureInPicture(false);
    } else {
      videoRef.current.requestPictureInPicture();
      setIsPictureInPicture(true);
    }
  };

  useEffect(() => {
    const handleLeavePictureInPicture = () => {
      setIsPictureInPicture(false);
    };
    document.addEventListener(
      "leavepictureinpicture",
      handleLeavePictureInPicture
    );
    return () => {
      document.removeEventListener(
        "leavepictureinpicture",
        handleLeavePictureInPicture
      );
    };
  }, []);

  return (
    <>
      {!available && <p className={styles.alert}>Video not available</p>}
      <video
        className={styles.video}
        ref={videoRef}
        controls={controls}
        muted={muted}
        pictureInPicture={pictureInPicture}
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleVideoEnded}
        onPause={handleVideoPause}
        onRateChange={() => setPlaybackRate(videoRef.current.playbackRate)}
      />
      {viewSpeedbar && (
        <div className={styles.mainWrapper}>
          <div className={styles.wrapper}>
            <p className={styles.speedDesc}>Current video speed:</p>
            <p className={styles.speedValue}>{playbackRate}x</p>
          </div>
          <p className={styles.desc}>
            You can change the video viewing speed. To increase speed press
            <span className={styles.accent}>Ctrl+Alt+1</span>, to decrease
            <span className={styles.accent}>Ctrl+Alt+2</span>
          </p>
        </div>
      )}
      {pictureInPicture && (
        <button
          className={styles.pictureInPicture}
          onClick={handlePictureInPicture}
        >
          {isPictureInPicture
            ? "Exit Picture in Picture"
            : "Picture in Picture"}
        </button>
      )}
    </>
  );
};
