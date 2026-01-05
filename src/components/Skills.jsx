import { useEffect, useState, useRef } from "react";

const skills = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Express.js", level: 85, category: "Backend" },
  { name: "MongoDB", level: 80, category: "Database" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 75, category: "Language" },
  { name: "JavaScript", level: 90, category: "Language" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Language"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,217,255,0.05)_0%,_transparent_60%)]" />

      <div className="w-full max-w-[95vw] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            My Skills
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mt-4 animate-slide-up animate-delay-200">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in animate-delay-300">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 hover-lift animate-bounce-in animate-delay-${
                400 + index * 100
              } ${
                activeCategory === category
                  ? "bg-gradient-primary text-primary-foreground glow-primary"
                  : "glass-card text-muted-foreground hover:bg-muted hover:text-foreground hover-glow"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`glass-card p-8 rounded-xl hover:border-primary/30 transition-all duration-300 hover-lift animate-scale-in animate-delay-${
                600 + index * 100
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground text-lg">
                  {skill.name}
                </h3>
                <span className="text-primary font-mono text-base">
                  {skill.level}%
                </span>
              </div>

              <div className="skill-bar">
                <div
                  className="skill-bar-fill"
                  style={{
                    width: isVisible ? `${skill.level}%` : "0%",
                    transitionDelay: `${600 + index * 100}ms`,
                  }}
                />
              </div>

              <span className="text-sm text-muted-foreground mt-3 inline-block">
                {skill.category}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-20 text-center animate-fade-in animate-delay-800">
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
            ].map((tool, index) => (
              <span
                key={tool}
                className={`px-6 py-3 rounded-full glass-card text-base text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-300 hover-lift animate-bounce-in animate-delay-${
                  900 + index * 50
                }`}
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
