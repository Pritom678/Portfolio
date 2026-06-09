import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".anim-nav-bar",
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    tl.fromTo(
      ".anim-nav-logo",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6 },
      "-=0.4"
    );

    tl.fromTo(
      ".anim-nav-link",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
      "-=0.3"
    );

    tl.fromTo(
      ".anim-nav-cta",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5 },
      "-=0.4"
    );

    // Underline hover on each nav link
    document.querySelectorAll(".anim-nav-link").forEach((link) => {
      const line = link.querySelector(".nav-underline");
      link.addEventListener("mouseenter", () =>
        gsap.to(line, { scaleX: 1, duration: 0.25, ease: "power2.out" })
      );
      link.addEventListener("mouseleave", () =>
        gsap.to(line, { scaleX: 0, duration: 0.2, ease: "power2.in" })
      );
    });
  }, { scope: navRef });

  // Scroll-based border
  useGSAP(() => {
    gsap.to(".anim-nav-bar", {
      borderBottomColor: scrolled ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0)",
      backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
      duration: 0.35,
      ease: "power2.out",
    });
  }, { dependencies: [scrolled], scope: navRef });

  // Mobile menu animation
  useGSAP(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".mobile-link"),
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power2.out", delay: 0.1 }
      );
    }
  }, { dependencies: [isOpen] });

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      {/* Main bar */}
      <div
        className="anim-nav-bar flex items-center justify-between px-8 md:px-14 py-5 border-b border-transparent"
        style={{ transition: "none" }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="anim-nav-logo flex items-center gap-2 group"
        >
          <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <span className="text-white font-black text-[11px]">P</span>
          </span>
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-black">
            Pritom Das
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="anim-nav-link relative flex flex-col text-xs font-medium tracking-[0.2em] uppercase text-black/50 hover:text-black transition-colors duration-200 pb-0.5"
              >
                {link.label}
                <span
                  className="nav-underline absolute -bottom-0.5 left-0 w-full h-px bg-black origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="anim-nav-cta group hidden md:flex items-center gap-2 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-black/80 transition-colors"
          >
            Let&apos;s Talk
            <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile hamburger */}
          <button
            className="anim-nav-cta md:hidden p-2 border border-black/15 hover:border-black hover:bg-black hover:text-white transition-all duration-200 text-black"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen
              ? <X className="h-4 w-4" />
              : <Menu className="h-4 w-4" />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-b border-black/10"
        >
          <ul className="flex flex-col px-8 py-4">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-black/5 last:border-0">
                <a
                  href={link.href}
                  className="mobile-link flex items-center justify-between py-4 text-xs font-semibold tracking-[0.25em] uppercase text-black/50 hover:text-black transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-30" />
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contact"
                className="mobile-link flex items-center justify-center gap-2 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 w-full hover:bg-black/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Let&apos;s Talk
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;