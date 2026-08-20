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

      <h1>Settings</h1>

      <ProfileSettingsForm />
      <br />
      <PasswordSettingsForm />
    </main>
  );
}

export default SettingsPage;