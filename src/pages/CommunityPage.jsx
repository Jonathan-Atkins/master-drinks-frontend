import CommunityCollection from "../features/community/CommunityCollection";

import SquigglyUnderline from "../components/ui/SquigglyUnderline";
import "../styles/community.css";

function CommunityPage() {
  return (
    <main>
      <header className="page-header-section">
        <SquigglyUnderline as="h1" className="page-header page-heading-underline" color="green">
          Community
        </SquigglyUnderline>

        <p className="page-header-description">
          Find other members of the BarBuddy community.
        </p>
      </header>

      <CommunityCollection />
    </main>
  );
}

export default CommunityPage;