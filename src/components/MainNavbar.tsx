
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <SomaliFlag className="w-7 h-7" />
          </span>
          <span
            className="text-2xl font-bold ml-2"
            style={{
              color: HERO_BLUE,
              letterSpacing: 1,
            }}
          >
            Dugsi
          </span>
        </div>

        <div className="flex items-center">
          {/* Desktop knapper: Log ind & Tilmeld – kun på forsiden */}
          {!isMobile && isHome && (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md font-medium text-[#4CA6FE] hover:bg-[#4CA6FE]/10 transition"
              >
                Log ind
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md font-medium text-white bg-[#4CA6FE] hover:bg-[#238dde] transition"
              >
                Opret bruger
              </Link>
            </div>
          )}
          {/* Mobil menu ikon – beholdes */}
          {isMobile && (
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#4CA6FE] hover:text-white hover:bg-[#4CA6FE]/80 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Åbn hovedmenu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobilmenuen inkl. Log ind & Tilmeld knapper – kun på forsiden */}
      {isMobile && isMenuOpen && isHome && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="pt-4 flex flex-col space-y-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md font-medium text-[#4CA6FE] hover:bg-[#4CA6FE]/10 transition text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Log ind
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md font-medium text-white bg-[#4CA6FE] hover:bg-[#238dde] transition text-center"
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
