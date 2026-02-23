import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import SomaliFlag from "@/components/landing/SomaliFlag";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ROUTES, APP_NAME } from "@/utils/constants";
import { cn } from "@/lib/utils";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isLearningPage = location.pathname === ROUTES.LEARN || location.pathname === ROUTES.LEARNING;

  // Don't render the navbar on the learning pages
  if (isLearningPage) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Du er nu logget ud");
      navigate(ROUTES.HOME);
      setIsMenuOpen(false);
    } catch (error) {
      toast.error("Der opstod en fejl ved logout");
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 flex items-center justify-between safe-area-padding h-12 sm:h-14 shadow-sm">
      <Link to={ROUTES.HOME} className="flex items-center hover:opacity-80 transition-opacity">
        <SomaliFlag className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="text-lg sm:text-xl md:text-2xl font-bold ml-1 sm:ml-2 text-hero-blue tracking-wide">
          {APP_NAME}
        </span>
      </Link>

      <nav className="flex items-center">
        {/* Desktop Actions */}
        {!isMobile && (
          <div className="flex gap-2">
            {user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-hero-blue hover:bg-hero-blue/10"
                >
                  <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-hero-blue hover:bg-hero-blue/10"
                >
                  <Link to={ROUTES.LEARNING}>Start læring</Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Log ud
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-hero-blue hover:bg-hero-blue/10"
                >
                  <Link to={ROUTES.LOGIN}>Log ind</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-hero-blue hover:bg-hero-blue/90"
                >
                  <Link to={ROUTES.SIGNUP}>Opret bruger</Link>
                </Button>
              </>
            )}
          </div>
        )}
        
        {/* Mobile Menu Toggle */}
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Luk menu" : "Åbn menu"}
            className="text-hero-blue hover:bg-hero-blue/10"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 w-full bg-card border-b border-border shadow-lg">
          <div className="p-4 space-y-3">
            {user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full text-hero-blue hover:bg-hero-blue/10"
                  onClick={closeMenu}
                >
                  <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full text-hero-blue hover:bg-hero-blue/10"
                  onClick={closeMenu}
                >
                  <Link to={ROUTES.LEARNING}>Learning</Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Log ud
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full text-hero-blue hover:bg-hero-blue/10"
                  onClick={closeMenu}
                >
                  <Link to={ROUTES.LOGIN}>Log ind</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-hero-blue hover:bg-hero-blue/90"
                  onClick={closeMenu}
                >
                  <Link to={ROUTES.SIGNUP}>Opret bruger</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
