import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import clubLogo from "@/assets/club-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Fixtures", to: "/fixtures" },
  { label: "Academy", to: "/academy" },
  { label: "Gallery", to: "/gallery" },
  { label: "News", to: "/news" },
  { label: "Donate", to: "/donate" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg py-2" : "bg-primary/90 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={clubLogo}
            alt="Victoria FC Orom"
            className="h-12 w-12 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="hidden sm:block">
            <div className="font-heading text-primary-foreground text-sm font-bold uppercase tracking-wider leading-tight">
              Victoria FC
            </div>
            <div className="text-[10px] text-gold uppercase tracking-widest leading-tight">Orom • Uganda</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link px-3 py-2 text-xs text-primary-foreground/90 hover:text-gold ${
                location.pathname === link.to ? "text-gold" : ""
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded" />
              )}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-primary-foreground text-sm"
              >
                <User className="w-4 h-4" />
                <span className="max-w-24 truncate">{profile?.full_name || user.email?.split("@")[0]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50">
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/10 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" /> Admin Panel
                  </Link>
                  <button
                    onClick={() => { signOut(); setUserMenuOpen(false); }}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="btn-gold px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
                <LogIn className="w-3 h-3 mr-1" /> Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-primary-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary-dark border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors ${
                  location.pathname === link.to
                    ? "bg-gold text-primary font-bold"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-primary-foreground/10 mt-2">
              {user ? (
                <button
                  onClick={signOut}
                  className="w-full px-4 py-3 rounded-lg text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-left flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              ) : (
                <Link to="/auth">
                  <Button className="btn-gold w-full">Login / Register</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
