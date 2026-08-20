import { useEffect, useRef, useState } from "react";

function AuthBackgroundVideo({
  src = "/beerVideo.mp4",
  type = "video/mp4",
}) {
  const videoRef = useRef(null);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let playbackTimeout;

    const handlePlaying = () => {
      setPlaybackBlocked(false);
      window.clearTimeout(playbackTimeout);
    };

    video.addEventListener("playing", handlePlaying);

    playbackTimeout = window.setTimeout(() => {
      if (video.paused) {
        setPlaybackBlocked(true);
      }
    }, 2000);

    return () => {
      video.removeEventListener("playing", handlePlaying);
      window.clearTimeout(playbackTimeout);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="auth-card-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={src} type={type} />
      </video>

      {playbackBlocked && (
        <p
          className="video-playback-notice"
          role="status"
        >
          Background video could not autoplay. Low Power Mode or
          browser settings may limit some visual features.
        </p>
      )}
    </>
  );
}

export default AuthBackgroundVideo;