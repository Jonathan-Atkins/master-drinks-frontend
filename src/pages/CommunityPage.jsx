import CommunityCollection from "../features/community/CommunityCollection";

import "../styles/community.css";

function CommunityPage() {
  return (
    <main>
      <header className="page-header-section">
        <h1 className="page-header page-heading-underline">
          Community
        </h1>

        <p className="page-header-description">
          Find other members of the BarBuddy community.
        </p>
      </header>

      <CommunityCollection />
    </main>
  );
}

export default CommunityPage;