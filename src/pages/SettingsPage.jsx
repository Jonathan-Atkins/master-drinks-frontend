import ProfileSettingsForm from "../features/settings/components/ProfileSettingsForm";
import PasswordSettingsForm from "../features/settings/components/PasswordSettingsForm";
import DeleteAccountSection from "../features/settings/components/DeleteAccountSection";

function SettingsPage() {
  return (
    <main className="settings-page">
      <header className="page-header-section">
        <h1 className="page-header page-heading-underline">
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