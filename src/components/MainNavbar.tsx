
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HERO_BLUE = "#4CA6FE";

const navLinks = [
  { label: "Hjem", to: "/" },
  { label: "Om Os", to: "/" },
  { label: "Kontakt", to: "/" },
];

const highlightClass =
  "relative px-3 py-2 text-sm font-medium rounded transition-all " +
  "text-white bg-[#4CA6FE] hover:bg-[#377dc1] shadow hover:scale-105";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span
              className="text-2xl font-bold"
              style={{ color: HERO_BLUE }}
            >
              Dugsi
            </span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-4">
              {navLinks.map((link, i) => (
                <Link
                  to={link.to}
                  key={link.label}
                  className={highlightClass}
                  style={{
                    marginLeft: i > 0 ? 6 : 0,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline" className="border-gray-300">
                Log Ind
              </Button>
              <Button>Tilmeld</Button>
            </div>

            {/* Mobile menu button */}
            {isMobile && (
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 focus:outline-none"
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
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map((link) => (
              <Link
                to={link.to}
                key={link.label}
                className={highlightClass + " block w-full text-center mb-2"}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="w-full justify-center">
                Log Ind
              </Button>
              <Button className="w-full justify-center">
                Tilmeld
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;

