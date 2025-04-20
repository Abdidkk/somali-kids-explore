import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import SomaliFlag from "@/components/landing/SomaliFlag";
const HERO_BLUE = "#4CA6FE";
const navLinks = [{
  label: "Hjem",
  to: "/"
}, {
  label: "Om Os",
  to: "/"
}, {
  label: "Kontakt",
  to: "/"
}];
const highlightClass = "relative px-3 py-2 text-sm font-semibold rounded transition-all " + "text-white bg-[#4CA6FE] hover:bg-[#1575ad] hover:scale-105 shadow ring-1 ring-[#4CA6FE]/60 hover:ring-[#4CA6FE]";
const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
        <div className="flex items-center space-x-2">
          {/* Somali flag up in the corner */}
          <span className="flex items-center">
            <SomaliFlag size={28} />
          </span>
          <span className="text-2xl font-bold ml-2" style={{
          color: HERO_BLUE,
          letterSpacing: 1
        }}>
            Dugsi
          </span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link, i) => <Link to={link.to} key={link.label} className={highlightClass + " hover-scale"} style={{
          marginLeft: i > 0 ? 6 : 0
        }}>
                {link.label}
              </Link>)}
          </nav>}

        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-gray-300 hover:border-[#4CA6FE] hover:text-[#4CA6FE]">
              Log Ind
            </Button>
            <Button className="bg-purple-800 hover:bg-purple-700">
              Tilmeld
            </Button>
          </div>

          {/* Mobile menu button */}
          {isMobile && <button type="button" className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#4CA6FE] hover:text-white hover:bg-[#4CA6FE]/80 focus:outline-none" onClick={toggleMenu}>
              <span className="sr-only">Åbn hovedmenu</span>
              {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobile && isMenuOpen && <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => <Link to={link.to} key={link.label} className={highlightClass + " block w-full text-center mb-2 shadow-sm"} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>)}
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="w-full justify-center border-gray-300 hover:border-[#4CA6FE] hover:text-[#4CA6FE]">
                Log Ind
              </Button>
              <Button className="w-full justify-center bg-[#4CA6FE] hover:bg-[#1575ad]">
                Tilmeld
              </Button>
            </div>
          </div>
        </div>}
    </header>;
};
export default MainNavbar;