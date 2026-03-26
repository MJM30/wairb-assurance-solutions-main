import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onRequestClick: () => void;
}

const Navbar = ({ onRequestClick }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { href: "/", id: "accueil", label: "Accueil" },
    { href: "/nos-solutions", id: "solutions", label: "Nos Solutions" },
    { href: "/apropos", id: "apropos", label: "À Propos" },
    { href: "/contact", id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Topbar */}
      <div className="bg-primary text-primary-foreground text-xs md:text-sm py-2">
        <div className="container flex justify-between items-center">
           <div className="flex items-center gap-4 md:gap-6 font-medium">
              <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <Phone className="h-3.5 w-3.5" /> 
                <span className="hidden sm:inline">+243 XX XXX XXXX</span>
              </span>
              <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <Mail className="h-3.5 w-3.5" /> 
                <span className="hidden sm:inline">contact@wairbdrc.com</span>
              </span>
           </div>
           <div>
              <Link to="/actualites" className="font-bold uppercase tracking-wider text-[10px] md:text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all flex items-center gap-2">
                Actualités <span className="hidden sm:inline">de l'entreprise</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
              </Link>
           </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="bg-card/90 backdrop-blur-md border-b card-shadow transition-colors">
        <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center transition-transform hover:scale-105 duration-300">
          <img 
            src="/images/img_logo.jpeg" 
            alt="WAIRB DRC Logo" 
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.id}
                to={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group",
                  active 
                    ? "text-primary bg-primary/5" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button onClick={onRequestClick} size="sm" className="rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
            Soumettre une demande
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-card animate-in slide-in-from-top duration-300">
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.id}
                  to={link.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-colors",
                    active 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  {active && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                </Link>
              );
            })}
            <div className="pt-4 px-2">
              <Button onClick={() => { onRequestClick(); setOpen(false); }} className="w-full rounded-xl font-bold py-6">
                Soumettre une demande
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
