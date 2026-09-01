import { useEffect, useRef } from "react";

function AccountCreatedNotice({
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
      className="account-created-dialog"
      onCancel={preventEscapeClose}
      aria-labelledby="account-created-title"
    >
      <h2 id="account-created-title">
        Profile Successfully Made!
      </h2>

      <p>
        Login to access profile.
      </p>

      <button
        type="button"
        className="account-created-button"
        onClick={onAcknowledge}
        autoFocus
      >
        OK
      </button>
    </dialog>
  );
}

export default AccountCreatedNotice;