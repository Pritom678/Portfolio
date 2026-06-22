import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "../icons/BrandIcons.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProjectModal from "./ProjectModal.jsx";
import { projects } from "../data/projects.js";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const squarespaceProjects = projects.filter((p) => p.platform === "Squarespace");
  const wixProjects = projects.filter((p) => p.platform === "Wix");
  const customProjects = projects.filter((p) => p.platform === "Custom");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
    tl.fromTo(".projects-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .fromTo(".projects-title-word", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power4.out" }, "-=0.4")
      .fromTo(".projects-divider", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.5");

    gsap.fromTo(cardsRef.current.filter(Boolean), { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" }, {
      y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: containerRef.current, start: "top 70%", toggleActions: "play none none reverse" },
    });

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const img = card.querySelector("img");
      const tags = card.querySelectorAll(".proj-tag");
      const btn = card.querySelector(".details-btn");
      card.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.07, duration: 0.6, ease: "power2.out" });
        gsap.to(tags, { backgroundColor: "#000", color: "#fff", borderColor: "#000", duration: 0.18, stagger: 0.04 });
        gsap.to(btn, { x: 4, duration: 0.2, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(tags, { backgroundColor: "transparent", color: "rgba(0,0,0,0.5)", borderColor: "rgba(0,0,0,0.12)", duration: 0.18, stagger: 0.04 });
        gsap.to(btn, { x: 0, duration: 0.2, ease: "power2.out" });
      });
    });
  }, { scope: containerRef });

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-28 relative" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

        {/* ── Header ── */}
        <div className="mb-10 sm:mb-14" ref={headerRef}>
          <div className="projects-eyebrow flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-4 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">Portfolio</p>
          </div>
          <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-0 mb-5 sm:mb-6">
            {["My", "Projects"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <h2 className={`projects-title-word text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-[0.88]
                  ${i === 1 ? "text-white [-webkit-text-stroke:2.5px_black]" : "text-black"}`}>
                  {word}
                </h2>
              </div>
            ))}
          </div>
          <div className="projects-divider w-full h-px bg-black/10" />
        </div>

        {/* ── Squarespace Projects ── */}
        <ProjectGroup
          label="Squarespace Projects"
          projects={squarespaceProjects}
          startIndex={0}
          cardsRef={cardsRef}
          onOpen={setSelectedProject}
        />

        {/* ── Wix Projects ── */}
        <ProjectGroup
          label="Wix Projects"
          projects={wixProjects}
          startIndex={squarespaceProjects.length}
          cardsRef={cardsRef}
          onOpen={setSelectedProject}
        />

        {/* ── Custom Coded Projects ── */}
        <ProjectGroup
          label="Custom Coded Projects"
          projects={customProjects}
          startIndex={squarespaceProjects.length + wixProjects.length}
          cardsRef={cardsRef}
          onOpen={setSelectedProject}
        />

        {/* ── CTA ── */}
        <div className="flex justify-center pt-4">
          <a
            href="#contact"
            className="group flex items-center gap-3 border border-black/15 hover:border-black hover:bg-black hover:text-white text-black font-bold text-xs tracking-[0.2em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-200"
          >
            Discuss a Project
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

// ── Project group (label + grid) ─────────────────────────────
const ProjectGroup = ({ label, projects, startIndex, cardsRef, onOpen }) => (
  <div className="mb-10 sm:mb-14">
    <div className="flex items-center gap-4 mb-6 sm:mb-8">
      <span className="w-4 h-px bg-black/30" />
      <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">{label}</p>
      <div className="flex-1 h-px bg-black/10" />
    </div>
    <div
      className="grid grid-cols-1 sm:grid-cols-2 border border-black/10"
      style={{ gap: "1px", background: "rgba(0,0,0,0.1)" }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={startIndex + index}
          cardRef={(el) => (cardsRef.current[startIndex + index] = el)}
          onOpen={onOpen}
        />
      ))}
    </div>
  </div>
);

// ── Project card ──────────────────────────────────────────────
const ProjectCard = ({ project, index, cardRef, onOpen }) => (
  <div ref={cardRef} className="bg-white flex flex-col overflow-hidden cursor-pointer">
    {/* Image */}
    <div className="relative overflow-hidden bg-black/5 shrink-0" style={{ height: "clamp(180px, 30vw, 240px)" }}>
      <img src={project.image} alt={project.name} className="w-full h-full object-cover grayscale" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="w-4 h-px bg-white/50" />
        <span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-white/55">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <span className="text-[9px] font-semibold tracking-[0.25em] uppercase px-2 sm:px-2.5 py-1 bg-black/75 text-white border border-white/15">
          {project.platform}
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="px-5 sm:px-7 pt-4 sm:pt-5 pb-5 sm:pb-7 flex flex-col gap-3 sm:gap-4 flex-1">
      <h3 className="text-[clamp(1.1rem,2.5vw,1.75rem)] font-black uppercase tracking-tight leading-tight">
        {project.name}
      </h3>
      <p className="text-xs sm:text-sm text-black/50 leading-relaxed"
        style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="proj-tag text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase px-2 sm:px-3 py-1 sm:py-1.5 border border-black/12 text-black/50">
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="proj-tag text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] uppercase px-2 sm:px-3 py-1 sm:py-1.5 border border-black/12 text-black/50">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
      <div className="mt-auto pt-4 border-t border-black/8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            className="details-btn flex items-center gap-1.5 sm:gap-2 text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black shrink-0"
            onClick={() => onOpen(project)}
          >
            View Details
            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
          {project.platform === "Custom" && project.githubLink !== "#" ? (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 sm:gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-black/40 hover:text-black transition-colors shrink-0">
              <GitHubIcon className="h-3 w-3" />
              <span className="hidden xs:inline">GitHub</span>
            </a>
          ) : (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 sm:gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-black/40 hover:text-black transition-colors shrink-0">
              <ExternalLink className="h-3 w-3" />
              <span className="hidden xs:inline">Visit Site</span>
            </a>
          )}
        </div>
        <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/25 shrink-0">
          {project.year ?? "2025"}
        </span>
      </div>
    </div>
  </div>
);

export default Projects;
