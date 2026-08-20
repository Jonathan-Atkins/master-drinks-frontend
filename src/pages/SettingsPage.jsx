import ProfileSettingsForm from "../components/forms/ProfileSettingsForm";
import PasswordSettingsForm from "../components/forms/PasswordSettingsForm";
import { useNavigate } from "react-router-dom";

function SettingsPage() {
  const navigate = useNavigate();
  
  return (
    <main className="settings-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">Settings</h1>

        <p className="page-header-description">
          Update your profile and account details.
        </p>
      </header>

      <ProfileSettingsForm />
      <br />
      <PasswordSettingsForm />
    </main>
  );
}

export default SettingsPage;