import { useEffect, useRef } from "react";

function AuthBackgroundVideo({
  src = "/beerVideo.mp4",
  type = "video/mp4",
  onPlaybackBlockedChange,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let playbackTimeout;

    const handlePlaying = () => {
      onPlaybackBlockedChange?.(false);
      window.clearTimeout(playbackTimeout);
    };

    video.addEventListener(
      "playing",
      handlePlaying
    );

    playbackTimeout = window.setTimeout(() => {
      if (video.paused) {
        onPlaybackBlockedChange?.(true);
      }
    }, 2000);

    return () => {
      video.removeEventListener(
        "playing",
        handlePlaying
      );

      window.clearTimeout(playbackTimeout);
    };
  }, [onPlaybackBlockedChange]);

  return (
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
  );
}

export default AuthBackgroundVideo;