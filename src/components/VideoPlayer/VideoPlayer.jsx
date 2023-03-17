// import React, { useRef, useEffect } from "react";
// import Hls from "hls.js";

// const VideoPlayer = ({ src }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(src);
//       hls.attachMedia(video);
//     } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = src;
//     }
//   }, [src]);

//   return <video className="w-full rounded" ref={videoRef} controls />;
// };

// export default VideoPlayer;
