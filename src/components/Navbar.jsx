import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full max-w-[95vw] mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-3xl font-bold text-gradient hover-lift transition-all duration-300"
          >
            PD<span className="text-foreground">.</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-12">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={`animate-fade-in animate-delay-${100 + index * 100}`}
              >
                <a
                  href={link.href}
                  className="nav-link text-base font-medium uppercase tracking-wider"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover-lift"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
            <ul className="flex flex-col py-4">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={`animate-slide-up animate-delay-${
                    100 + index * 50
                  }`}
                >
                  <a
                    href={link.href}
                    className="block px-6 py-4 text-base font-medium uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
