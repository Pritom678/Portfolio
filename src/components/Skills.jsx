import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Services data ────────────────────────────────────────────
const services = [
  {
    id: "01",
    name: "Wix Website Development",
    category: "Platform",
    description:
      "Fast, professional Wix websites built with SEO best practices, mobile responsiveness, and conversion-focused layouts. Perfect for businesses that need a reliable, easy-to-manage online presence without the complexity of custom code.",
  },
  {
    id: "02",
    name: "Squarespace Website Development",
    category: "Platform",
    description:
      "Elegant, design-forward Squarespace sites built for personal brands, creatives, and businesses. Every site is structured for clean navigation, fast load times, and a polished visual identity that builds client trust instantly.",
  },
  {
    id: "03",
    name: "Custom Coded Websites",
    category: "Custom",
    description:
      "Fully custom React, HTML, and JavaScript websites built from scratch for maximum performance, flexibility, and scalability. Ideal for businesses that need unique functionality, advanced animations, or a competitive edge beyond template limitations.",
  },
];

// ── Skills data ──────────────────────────────────────────────
const skills = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
];

const additionalTools = [
  "Wix Editor X",
  "Wix Studio",
  "Squarespace 7.1",
  "Git",
  "GitHub",
  "Firebase",
  "TanStack Query",
  "REST APIs",
  "Responsive Design",
  "GSAP Animation",
  "Framer Motion",
  "SEO Optimisation",
];

const categories = ["All", "Frontend", "Backend", "Database", "Language"];

const categoryIndex = {
  Frontend: "01",
  Backend: "02",
  Database: "03",
  Language: "04",
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);
  const filtersRef = useRef(null);
  const skillsGridRef = useRef(null);
  const toolsRef = useRef(null);
  const servicesGridRef = useRef(null);

  // ── Entrance animations ──────────────────────────────────────
  useGSAP(
    () => {
      // Header
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".skills-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          ".skills-title-word",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          ".skills-divider",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
          "-=0.5"
        );

      // Services cards
      gsap.fromTo(
        servicesGridRef.current.children,
        { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: servicesGridRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Filter buttons
      gsap.fromTo(
        filtersRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Skills grid
      gsap.fromTo(
        skillsGridRef.current.children,
        { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsGridRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tools row
      gsap.fromTo(
        toolsRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tool tag hover
      Array.from(toolsRef.current.children).forEach((tag) => {
        tag.addEventListener("mouseenter", () =>
          gsap.to(tag, { backgroundColor: "#000", color: "#fff", borderColor: "#000", duration: 0.18 })
        );
        tag.addEventListener("mouseleave", () =>
          gsap.to(tag, { backgroundColor: "transparent", color: "rgba(0,0,0,0.5)", borderColor: "rgba(0,0,0,0.12)", duration: 0.18 })
        );
      });
    },
    { scope: containerRef }
  );

  // ── Re-animate skills grid on filter change ──────────────────
  useGSAP(
    () => {
      gsap.fromTo(
        skillsGridRef.current.children,
        { opacity: 0, y: 24, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power3.out", stagger: 0.07 }
      );
    },
    { dependencies: [activeCategory], scope: skillsGridRef }
  );

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const titleWords = ["What I", "Offer"];

  return (
    <section id="skills" ref={containerRef} className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section Header ── */}
        <div className="mb-14">
          <div className="skills-eyebrow flex items-center gap-3 mb-5">
            <span className="w-4 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              Services
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-0 mb-6">
            {titleWords.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <h2
                  className={`skills-title-word text-[clamp(3rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-[0.88]
                    ${i === 1
                      ? "text-white [-webkit-text-stroke:2.5px_black]"
                      : "text-black"
                    }`}
                >
                  {word}
                </h2>
              </div>
            ))}
          </div>

          <div className="skills-divider w-full h-px bg-black/10" />
        </div>

        {/* ── Services Grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 border border-black/10"
          style={{ gap: "1px", background: "rgba(0,0,0,0.1)" }}
          ref={servicesGridRef}
        >
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white px-7 py-10 flex flex-col gap-5 group"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-px bg-black/20" />
                <span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-black/30">
                  {service.id}
                </span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight leading-tight text-black">
                {service.name}
              </h3>
              <div className="w-full h-px bg-black/8" />
              <p className="text-xs text-black/50 leading-relaxed flex-1">
                {service.description}
              </p>
              <span className="self-start text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 border border-black/12 text-black/50">
                {service.category}
              </span>
            </div>
          ))}
        </div>

        {/* ── Skills Sub-section ── */}
        <div className="mt-20">
          {/* Skills label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="w-4 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              Core Skills
            </p>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-12" ref={filtersRef}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold tracking-[0.25em] uppercase px-5 py-2.5 border transition-none
                  ${activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black/50 border-black/12 hover:border-black/30"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-black/10"
            style={{ gap: "1px", background: "rgba(0,0,0,0.1)" }}
            ref={skillsGridRef}
          >
            {filteredSkills.map((skill, i) => (
              <div
                key={skill.name}
                className="bg-white px-7 py-8 flex flex-col gap-5 group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-px bg-black/20" />
                  <span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-black/30">
                    {categoryIndex[skill.category] ?? String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight leading-none text-black">
                  {skill.name}
                </h3>
                <div className="w-full h-px bg-black/8" />
                <span className="self-start text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 border border-black/12 text-black/50">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Other Tools ── */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-4 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              Other Tools &amp; Technologies
            </p>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          <div className="flex flex-wrap gap-2" ref={toolsRef}>
            {additionalTools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-2 border border-black/12 text-black/50 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
