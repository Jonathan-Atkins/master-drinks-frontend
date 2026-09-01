import { useEffect, useRef } from "react";

function VisualSettingsNotice({
  open,
  onAcknowledge,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const preventEscapeClose = (event) => {
    event.preventDefault();
  };

  return (
    <dialog
      ref={dialogRef}
      className="visual-settings-dialog"
      onCancel={preventEscapeClose}
      aria-labelledby="visual-settings-title"
      aria-describedby="visual-settings-description"
    >
      <h2 id="visual-settings-title">
        Visual Settings Notice
      </h2>

      <p id="visual-settings-description">
        Your device or browser is limiting
        some visual features. Reduced Motion,
        Low Power Mode, or autoplay settings
        may prevent animations and background
        video from playing as intended.
      </p>

      <button
        type="button"
        className="visual-settings-button"
        onClick={onAcknowledge}
        autoFocus
      >
        Continue
      </button>
    </dialog>
  );
}

export default VisualSettingsNotice;