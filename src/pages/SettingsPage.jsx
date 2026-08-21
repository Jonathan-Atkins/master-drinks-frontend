import ProfileSettingsForm from "../components/forms/ProfileSettingsForm";
import PasswordSettingsForm from "../components/forms/PasswordSettingsForm";
import DeleteAccountSection from "../components/settings/DeleteAccountSection";

function SettingsPage() {
  return (
    <main className="settings-page">
      <header className="page-header-section">
        <h1 className="page-header animated-underline auto-underline">
          Settings
        </h1>

        <p className="page-header-description">
          Update your profile and account details.
        </p>
      </header>

      <ProfileSettingsForm />

      <PasswordSettingsForm />

      <DeleteAccountSection />
    </main>
  );
}

export default SettingsPage;