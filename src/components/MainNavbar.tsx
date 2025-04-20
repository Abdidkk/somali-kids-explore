import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import SomaliFlag from "@/components/landing/SomaliFlag";
import { Link, useNavigate } from "react-router-dom";

const HERO_BLUE = "#4CA6FE";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
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
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-gray-300 hover:border-[#4CA6FE] hover:text-[#4CA6FE] py-0 px-[23px]"
              onClick={() => navigate("/login")}
            >
              Log Ind
            </Button>
            <Button className="bg-purple-800 hover:bg-purple-700 px-[39px]">
              Tilmeld
            </Button>
          </div>

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

      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="pt-4 flex flex-col space-y-3">
              <Button
                variant="outline"
                className="w-full justify-center border-gray-300 hover:border-[#4CA6FE] hover:text-[#4CA6FE]"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
              >
                Log Ind
              </Button>
              <Button className="w-full justify-center bg-[#4CA6FE] hover:bg-[#1575ad]">
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
