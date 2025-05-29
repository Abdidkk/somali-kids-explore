import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import SomaliFlag from "@/components/landing/SomaliFlag";
import { Link, useLocation } from "react-router-dom";

const HERO_BLUE = "#4CA6FE";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isLearningPage = location.pathname === "/laer";

  // Don't render the navbar on the learning page
  if (isLearningPage) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between px-2 sm:px-3 md:px-4 h-12 sm:h-14">
      <div className="flex items-center">
        <SomaliFlag className="w-6 h-6 sm:w-7 sm:h-7" />
        <span
          className="text-lg sm:text-xl md:text-2xl font-bold ml-1 sm:ml-2"
          style={{
            color: HERO_BLUE,
            letterSpacing: 0.5,
          }}
        >
          Dugsi
        </span>
      </div>

      <div className="flex items-center">
        {/* Desktop knapper: Log ind & Tilmeld – kun på forsiden */}
        {!isMobile && isHome && (
          <div className="flex gap-1 sm:gap-2">
            <Link
              to="/login"
              className="px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base font-medium text-[#4CA6FE] hover:bg-[#4CA6FE]/10 transition"
            >
              Log ind
            </Link>
            <Link
              to="/signup"
              className="px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base font-medium text-white bg-[#4CA6FE] hover:bg-[#3b95e9] transition"
            >
              Opret bruger
            </Link>
          </div>
        )}
        {/* Mobil menu ikon – beholdes */}
        {isMobile && (
          <button
            type="button"
            className="inline-flex items-center justify-center p-1 sm:p-2 rounded-md text-[#4CA6FE] hover:text-white hover:bg-[#4CA6FE]/80 focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Åbn hovedmenu</span>
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Mobilmenuen inkl. Log ind & Tilmeld knapper – kun på forsiden */}
      {isMobile && isMenuOpen && isHome && (
        <div className="absolute top-full left-0 right-0 w-full bg-white shadow-lg">
          <div className="px-3 py-3 space-y-1">
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                className="px-3 py-2 rounded-md font-medium text-[#4CA6FE] hover:bg-[#4CA6FE]/10 transition text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Log ind
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 rounded-md font-medium text-white bg-[#4CA6FE] hover:bg-[#3b95e9] transition text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Opret bruger
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
