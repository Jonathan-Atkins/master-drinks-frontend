import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

import SignOutButton from "../ui/SignOutButton";

import "../../styles/NavBar.css";

const navItems = [
  {
    label: "Home",
    path: "/dashboard",
  },
  {
    label: "Create A Drink",
    path: "/drink-maker",
  },
  {
    label: "My Recipes",
    path: "/my-recipes",
  },
  {
    label: "Browse Recipes",
    path: "/recipes",
  },
  {
    label: "Community",
    path: "/community",
  },
  {
    label: "Ingredients",
    path: "/ingredients",
  },
  {
    label: "Settings",
    path: "/settings",
  },
  {
    label: "About BarBuddy",
    path: "/about",
  },
];

function NavBar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [direction, setDirection] =
    useState("right");

  const previousIndex = useRef(0);

  const activeIndex =
    navItems.findIndex(
      (item) =>
        item.path ===
        location.pathname
    );

  useEffect(() => {
    if (activeIndex === -1) {
      return;
    }

    if (
      activeIndex <
      previousIndex.current
    ) {
      setDirection("left");
    } else if (
      activeIndex >
      previousIndex.current
    ) {
      setDirection("right");
    }

    previousIndex.current =
      activeIndex;
  }, [activeIndex]);

  const handleMenuToggle = () => {
    setMenuOpen(
      (currentMenuState) =>
        !currentMenuState
    );
  };

  return (
    <nav className="main-nav">
      <div className="nav-inner">
        <button
          className="nav-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation-menu"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          onClick={
            handleMenuToggle
          }
        >
          <span className="nav-menu-label">
            Menu
          </span>

          <span
            className={`nav-menu-icon ${
              menuOpen
                ? "open"
                : ""
            }`}
            aria-hidden="true"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div
          id="main-navigation-menu"
          className={`nav-menu ${
            menuOpen
              ? "nav-menu-open"
              : ""
          }`}
        >
          <div className="nav-links">
            {navItems.map(
              (item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    setMenuOpen(
                      false
                    );
                  }}
                  className={({
                    isActive,
                  }) =>
                    `nav-link ${
                      isActive
                        ? "nav-link-active"
                        : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}

            {activeIndex !== -1 && (
              <div
                className={`nav-snake ${direction}`}
                style={{
                  "--active-index":
                    activeIndex,
                  "--nav-count":
                    navItems.length,
                }}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M 30 10 C 35 10, 35 7, 40 10 C 45 13, 45 7, 50 10 C 55 13, 55 7, 60 10 C 65 13, 65 10, 70 10" />
                </svg>
              </div>
            )}
          </div>

          <div className="nav-sign-out">
            <SignOutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;