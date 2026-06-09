import { Code2, Coffee, Gamepad2, Music } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Code2, label: "Clean Code", description: "Writing maintainable, scalable code" },
  { icon: Coffee, label: "Problem Solver", description: "Turning complex ideas into simple solutions" },
  { icon: Gamepad2, label: "Gaming", description: "Competitive gaming in my downtime" },
  { icon: Music, label: "Music", description: "Coding with lo-fi beats" },
];

const stats = [
  { value: "3+", label: "Projects" },
  { value: "4+", label: "Technologies" },
  { value: "∞", label: "Curiosity" },
];

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Section eyebrow + heading wipe up
    gsap.fromTo(
      ".about-eyebrow",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".about-header", start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    // Each headline word clips up from its container
    gsap.fromTo(
      ".about-headline-word",
      { yPercent: 110, opacity: 0, rotationZ: 1.5 },
      {
        yPercent: 0, opacity: 1, rotationZ: 0,
        duration: 0.9, stagger: 0.1, ease: "power4.out",
        scrollTrigger: { trigger: ".about-header", start: "top 80%", toggleActions: "play none none reverse" },
      }
    );

    // Divider line grows
    gsap.fromTo(
      ".about-divider",
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1, duration: 1, ease: "power3.inOut",
        scrollTrigger: { trigger: ".about-header", start: "top 75%", toggleActions: "play none none reverse" },
      }
    );

    // Left text paragraphs slide from left
    gsap.fromTo(
      ".about-para",
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    // Stats count up from below
    gsap.fromTo(
      ".about-stat",
      { y: 40, opacity: 0, scale: 0.88 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.6, stagger: 0.1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".about-stats", start: "top 88%", toggleActions: "play none none reverse" },
      }
    );

    // Highlight cards wipe in from right via clip-path
    gsap.fromTo(
      ".about-card",
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      {
        clipPath: "inset(0 0% 0 0)", opacity: 1,
        duration: 0.75, stagger: 0.12, ease: "power3.inOut",
        scrollTrigger: { trigger: ".about-cards", start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    // Card hover — invert to black
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

    // Stat cards hover
    document.querySelectorAll(".about-stat").forEach((card) => {
      card.addEventListener("mouseenter", () =>
        gsap.to(card, { backgroundColor: "#000", borderColor: "#000", duration: 0.22, ease: "power2.out" })
      );
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.1)", duration: 0.22 })
      );
    });

    // Floating on cards (subtle)
    document.querySelectorAll(".about-card").forEach((card, i) => {
      gsap.to(card, {
        y: "+=6", duration: 2.8 + i * 0.3,
        repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.35,
      });
    });

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-28 bg-white text-black overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 md:px-14">

        {/* ── HEADER ── */}
        <div className="about-header mb-16 md:mb-20">
          {/* Eyebrow */}
          <div className="about-eyebrow flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-black" />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              About Me
            </span>
          </div>

          {/* Clipped headline */}
          <div className="space-y-1 mb-8">
            {["A Cleaner Way", "To Present", "Your Brand Online."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <h2
                  className={`about-headline-word text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.9] tracking-tight uppercase
                    ${i === 1 ? "text-white [-webkit-text-stroke:2px_black]" : "text-black"}`}
                >
                  {line}
                </h2>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="about-divider w-full h-px bg-black/10" />
        </div>

        {/* ── BODY GRID ── */}
        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-16 xl:gap-20 items-start">

          {/* LEFT — text + stats */}
          <div className="about-text space-y-7">
            <p className="about-para text-lg xl:text-xl text-black/50 leading-relaxed">
              I build visual-first websites that feel calm, structured, and premium. The goal is simple: make every section easier to trust, easier to browse, and more memorable for the people who matter.
            </p>

            <div className="about-para flex items-center gap-3">
              <span className="w-6 h-px bg-black" />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/40">
                Design + Development
              </span>
            </div>

            <p className="about-para text-lg xl:text-xl text-black/50 leading-relaxed">
              My process blends clean interface design, practical product thinking, and smooth frontend execution — so the site feels modern without becoming noisy or over-designed.
            </p>

            <p className="about-para text-lg xl:text-xl text-black/50 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, playing video games, or listening to music. I believe in continuous learning and always push myself to stay updated.
            </p>

            {/* Stats */}
            <div className="about-stats grid grid-cols-3 gap-0 border border-black/10 mt-10">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`about-stat group py-7 px-5 border-black/10 text-center cursor-default
                    ${i < stats.length - 1 ? "border-r" : ""}`}
                >
                  <p className="text-[clamp(2rem,4vw,3rem)] font-black leading-none group-hover:text-white transition-colors duration-200">
                    {s.value}
                  </p>
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-black/40 group-hover:text-white/50 mt-2 transition-colors duration-200">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — highlight cards */}
          <div className="about-cards grid grid-cols-2 gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="about-card border border-black/10 p-6 cursor-default"
              >
                <div className="card-icon w-12 h-12 bg-black/5 flex items-center justify-center mb-5 text-black">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="card-label font-black text-sm tracking-[0.15em] uppercase text-black mb-2">
                  {item.label}
                </h3>
                <p className="card-desc text-xs text-black/40 leading-relaxed">
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