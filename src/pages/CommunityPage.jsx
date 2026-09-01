import CommunityCollection from "../features/community/CommunityCollection";

import AnimatedUnderline from "../components/ui/AnimatedUnderline";
import "../styles/community.css";

function CommunityPage() {
  return (
    <main>
      <header className="page-header-section">
        <AnimatedUnderline as="h1" className="page-header page-heading-underline" color="green">
          Community
        </AnimatedUnderline>

        <p className="page-header-description">
          Find other members of the BarBuddy community.
        </p>
      </header>

      <CommunityCollection />
    </main>
  );
}

export default CommunityPage;