import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      // Simple initial animation
      const tl = gsap.timeline();

      // Animate navbar entrance
      tl.fromTo(
        navRef.current,
        {
          y: -100,
        },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      )
        // Animate logo with simple scale - ensure it ends at opacity 1
        .fromTo(
          logoRef.current,
          {
            scale: 0.5,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        // Animate nav links
        .fromTo(
          navLinksRef.current?.children || [],
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Simple hover effects for logo
      if (logoRef.current) {
        logoRef.current.addEventListener("mouseenter", () => {
          gsap.to(logoRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        logoRef.current.addEventListener("mouseleave", () => {
          gsap.to(logoRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    },
    { scope: navRef }
  );

  // Separate useGSAP for scroll-based animations
  useGSAP(
    () => {
      // Navbar background animation on scroll
      gsap.to(navRef.current, {
        backgroundColor: scrolled ? "rgba(15, 20, 25, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        duration: 0.3,
        ease: "power2.out",
      });
    },
    { dependencies: [scrolled], scope: navRef }
  );

  // Mobile menu animation
  useGSAP(
    () => {
      if (isOpen && mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          }
        );

        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll("li"),
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    },
    { dependencies: [isOpen], scope: mobileMenuRef }
  );

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full max-w-[95vw] mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <a
            ref={logoRef}
            href="#home"
            className="text-3xl font-bold text-gradient transition-all duration-300"
            style={{ opacity: 1, visibility: "visible" }}
          >
            PD<span className="text-foreground">.</span>
          </a>

          {/* Desktop Navigation */}
          <ul ref={navLinksRef} className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <li key={link.href}>
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
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
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
