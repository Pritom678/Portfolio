import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const categories = ["All", "Frontend", "Backend", "Database", "Language"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const skillsGridRef = useRef(null);
  const additionalSkillsRef = useRef(null);

  useGSAP(
    () => {
      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .from(headerRef.current.children[0], {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          headerRef.current.children[1],
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        );

      // Filter buttons animation
      gsap.fromTo(
        filtersRef.current.children,
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Skills grid animation
      const animateSkillCards = () => {
        const cards = skillsGridRef.current.children;
        gsap.fromTo(
          cards,
          {
            y: 80,
            opacity: 0,
            scale: 0.8,
            rotationY: 45,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
          },
        );
      };

      // Initial animation
      ScrollTrigger.create({
        trigger: skillsGridRef.current,
        start: "top 80%",
        onEnter: animateSkillCards,
      });

      // Additional skills animation
      gsap.fromTo(
        additionalSkillsRef.current.children,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: additionalSkillsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Hover animations for skill cards
      const skillCards = skillsGridRef.current.children;
      Array.from(skillCards).forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Floating animation for skill cards
      Array.from(skillCards).forEach((card, index) => {
        gsap.to(card, {
          y: "+=5",
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });
      });
    },
    { scope: containerRef },
  );

  // Re-animate when category changes
  useGSAP(
    () => {
      const cards = skillsGridRef.current.children;

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        },
      );
    },
    { dependencies: [activeCategory], scope: skillsGridRef },
  );

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,217,255,0.05)_0%,transparent_60%)]" />

      <div className="w-full max-w-[95vw] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20" ref={headerRef}>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            My Skills
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mt-4">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-16"
          ref={filtersRef}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-primary text-primary-foreground glow-primary"
                  : "glass-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
          ref={skillsGridRef}
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="glass-card p-8 mt-5 rounded-xl hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="font-semibold text-foreground text-lg mb-3">
                {skill.name}
              </h3>

              <span className="text-sm text-muted-foreground inline-block">
                {skill.category}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-20 text-center" ref={additionalSkillsRef}>
          <h3 className="text-2xl font-semibold mb-8">
            Other Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Git",
              "GitHub",
              "Firebase",
              "TanStack Query",
              "Chart.js",
              "NextAuth.js",
              "REST APIs",
              "Responsive Design",
              "GSAP Animation",
              "Framer Motion",
            ].map((tool) => (
              <span
                key={tool}
                className="px-6 py-3 rounded-full glass-card text-base text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-300"
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
