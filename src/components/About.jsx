import { Code2, Coffee, Gamepad2, Music } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Code2, label: "Custom Code", description: "React, HTML & JS sites built for performance and conversion" },
  { icon: Coffee, label: "Wix Expert", description: "Professional Wix builds with SEO, speed, and clean structure" },
  { icon: Gamepad2, label: "Squarespace", description: "Polished Squarespace sites for brands that value design" },
  { icon: Music, label: "Results-Driven", description: "Every site built to attract clients and grow your business" },
];

const stats = [
  { value: "4+", label: "Sites Built" },
  { value: "3", label: "Platforms" },
  { value: "∞", label: "Dedication" },
];

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".about-eyebrow", { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".about-header", start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".about-headline-word", { yPercent: 110, opacity: 0, rotationZ: 1.5 }, {
      yPercent: 0, opacity: 1, rotationZ: 0, duration: 0.9, stagger: 0.1, ease: "power4.out",
      scrollTrigger: { trigger: ".about-header", start: "top 80%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".about-divider", { scaleX: 0, transformOrigin: "left center" }, {
      scaleX: 1, duration: 1, ease: "power3.inOut",
      scrollTrigger: { trigger: ".about-header", start: "top 75%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".about-para", { x: -40, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: ".about-text", start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".about-stat", { y: 40, opacity: 0, scale: 0.88 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)",
      scrollTrigger: { trigger: ".about-stats", start: "top 88%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".about-card", { clipPath: "inset(0 100% 0 0)", opacity: 0 }, {
      clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.75, stagger: 0.12, ease: "power3.inOut",
      scrollTrigger: { trigger: ".about-cards", start: "top 85%", toggleActions: "play none none reverse" },
    });

    document.querySelectorAll(".about-card").forEach((card) => {
      const icon = card.querySelector(".card-icon");
      const label = card.querySelector(".card-label");
      const desc = card.querySelector(".card-desc");
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { backgroundColor: "#000", borderColor: "#000", duration: 0.25, ease: "power2.out" });
        gsap.to([label, desc], { color: "#fff", duration: 0.2 });
        gsap.to(icon, { backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", scale: 1.1, duration: 0.25 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.1)", duration: 0.25, ease: "power2.out" });
        gsap.to([label, desc], { color: "", duration: 0.2 });
        gsap.to(icon, { backgroundColor: "rgba(0,0,0,0.05)", color: "#000", scale: 1, duration: 0.25 });
      });
    });

    document.querySelectorAll(".about-stat").forEach((card) => {
      card.addEventListener("mouseenter", () => gsap.to(card, { backgroundColor: "#000", borderColor: "#000", duration: 0.22, ease: "power2.out" }));
      card.addEventListener("mouseleave", () => gsap.to(card, { backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.1)", duration: 0.22 }));
    });

    document.querySelectorAll(".about-card").forEach((card, i) => {
      gsap.to(card, { y: "+=6", duration: 2.8 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.35 });
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-16 sm:py-20 md:py-28 bg-white text-black overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-14">

        {/* ── HEADER ── */}
        <div className="about-header mb-10 sm:mb-14 md:mb-20">
          <div className="about-eyebrow flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-black" />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">About Me</span>
          </div>

          <div className="space-y-0.5 mb-6 sm:mb-8">
            {["Professional Websites", "That Work For", "Your Business."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <h2 className={`about-headline-word text-[clamp(2rem,6vw,6.5rem)] font-black leading-[0.88] tracking-tight uppercase
                  ${i === 1 ? "text-white [-webkit-text-stroke:2px_black]" : "text-black"}`}>
                  {line}
                </h2>
              </div>
            ))}
          </div>

          <div className="about-divider w-full h-px bg-black/10" />
        </div>

        {/* ── BODY GRID ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-10 sm:gap-14 xl:gap-20 items-start">

          {/* LEFT */}
          <div className="about-text space-y-5 sm:space-y-7">
            <p className="about-para text-base sm:text-lg xl:text-xl text-black/50 leading-relaxed">
              I specialise in building professional websites on Wix, Squarespace, and custom code — designed to attract the right clients, establish credibility, and convert visitors into customers.
            </p>
            <div className="about-para flex items-center gap-3">
              <span className="w-5 h-px bg-black" />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/40">Platform + Custom Development</span>
            </div>
            <p className="about-para text-base sm:text-lg xl:text-xl text-black/50 leading-relaxed">
              Whether you need a fast Wix or Squarespace site, or a fully custom-coded React build — I deliver clean, modern websites focused on real business outcomes: more leads, better brand perception, and a site you're proud to share.
            </p>
            <p className="about-para text-base sm:text-lg xl:text-xl text-black/50 leading-relaxed">
              I work with businesses, personal brands, and entrepreneurs who want a website that doesn't just look good — but actively grows their business.
            </p>

            {/* Stats */}
            <div className="about-stats grid grid-cols-3 gap-0 border border-black/10 mt-8">
              {stats.map((s, i) => (
                <div key={s.label}
                  className={`about-stat group py-5 sm:py-7 px-3 sm:px-5 border-black/10 text-center cursor-default
                    ${i < stats.length - 1 ? "border-r" : ""}`}>
                  <p className="text-[clamp(1.5rem,4vw,3rem)] font-black leading-none group-hover:text-white transition-colors duration-200">
                    {s.value}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-black/40 group-hover:text-white/50 mt-1.5 transition-colors duration-200">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — highlight cards */}
          <div className="about-cards grid grid-cols-2 gap-2 sm:gap-3">
            {highlights.map((item) => (
              <div key={item.label} className="about-card border border-black/10 p-4 sm:p-6 cursor-default">
                <div className="card-icon w-10 h-10 sm:w-12 sm:h-12 bg-black/5 flex items-center justify-center mb-4 sm:mb-5 text-black">
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="card-label font-black text-xs sm:text-sm tracking-[0.15em] uppercase text-black mb-1.5 sm:mb-2">
                  {item.label}
                </h3>
                <p className="card-desc text-[11px] sm:text-xs text-black/40 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
