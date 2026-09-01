import { useEffect, useState } from "react";

const VISUAL_NOTICE_KEY =
  "visual-settings-notice-acknowledged";

function useVisualSettingsNotice() {
  const [reducedMotion, setReducedMotion] =
    useState(false);

  const [playbackBlocked, setPlaybackBlocked] =
    useState(false);

  const [acknowledged, setAcknowledged] =
    useState(() => {
      return (
        sessionStorage.getItem(
          VISUAL_NOTICE_KEY
        ) === "true"
      );
    });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference
      );
    };
  }, []);

  const acknowledgeNotice = () => {
    sessionStorage.setItem(
      VISUAL_NOTICE_KEY,
      "true"
    );

    setAcknowledged(true);
  };

  return {
    showNotice:
      !acknowledged &&
      (reducedMotion || playbackBlocked),

    setPlaybackBlocked,
    acknowledgeNotice,
  };
}

export default useVisualSettingsNotice;