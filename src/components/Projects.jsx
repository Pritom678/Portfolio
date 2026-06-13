import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "../icons/BrandIcons.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal from "./ProjectModel.jsx";
import { projects } from "../data/projects.js";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const squarespaceProjects = projects.filter((p) => p.platform === "Squarespace");
  const wixProjects = projects.filter((p) => p.platform === "Wix");
  const customProjects = projects.filter((p) => p.platform === "Custom");

  useGSAP(
    () => {
      // ── Header reveal ──────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".projects-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          ".projects-title-word",
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".projects-divider",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
          "-=0.5"
        );

      // ── Cards stagger ──────────────────────────────────────────
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Card hover ─────────────────────────────────────────────
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const img = card.querySelector("img");
        const quickLinks = card.querySelector(".quick-links");
        const tags = card.querySelectorAll(".proj-tag");
        const btn = card.querySelector(".details-btn");

        card.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.07, duration: 0.6, ease: "power2.out" });
          gsap.to(quickLinks, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
          gsap.to(tags, {
            backgroundColor: "#000",
            color: "#fff",
            borderColor: "#000",
            duration: 0.18,
            stagger: 0.04,
          });
          gsap.to(btn, { x: 4, duration: 0.2, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
          gsap.to(quickLinks, {
            opacity: 0,
            y: 8,
            duration: 0.25,
            ease: "power2.out",
          });
          gsap.to(tags, {
            backgroundColor: "transparent",
            color: "rgba(0,0,0,0.5)",
            borderColor: "rgba(0,0,0,0.12)",
            duration: 0.18,
            stagger: 0.04,
          });
          gsap.to(btn, { x: 0, duration: 0.2, ease: "power2.out" });
        });
      });
    },
    { scope: containerRef }
  );

  const titleWords = ["My", "Projects"];

  return (
    <section id="projects" className="py-28 relative" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section Header ── */}
        <div className="mb-14" ref={headerRef}>
          {/* Eyebrow */}
          <div className="projects-eyebrow flex items-center gap-3 mb-5">
            <span className="w-4 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              Portfolio
            </p>
          </div>

          {/* Headline — per-word curtain */}
          <div className="flex flex-wrap gap-x-4 gap-y-0 mb-6">
            {titleWords.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <h2
                  className={`projects-title-word text-[clamp(3rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-[0.88]
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

          {/* Divider */}
          <div className="projects-divider w-full h-px bg-black/10" />
        </div>

        {/* ── Squarespace Projects ── */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-4 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              Squarespace Projects
            </p>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 border border-black/10"
            style={{ gap: "1px", background: "rgba(0,0,0,0.1)" }}
          >
            {squarespaceProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                cardRef={(el) => (cardsRef.current[index] = el)}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* ── Wix Projects ── */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-4 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              Wix Projects
            </p>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 border border-black/10"
            style={{ gap: "1px", background: "rgba(0,0,0,0.1)" }}
          >
            {wixProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={squarespaceProjects.length + index}
                cardRef={(el) => (cardsRef.current[squarespaceProjects.length + index] = el)}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* ── Custom Coded Projects ── */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-4 h-px bg-black/30" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              Custom Coded Projects
            </p>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 border border-black/10"
            style={{ gap: "1px", background: "rgba(0,0,0,0.1)" }}
          >
            {customProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={squarespaceProjects.length + wixProjects.length + index}
                cardRef={(el) => (cardsRef.current[squarespaceProjects.length + wixProjects.length + index] = el)}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* ── View More Button ── */}
        <div className="flex justify-center pt-4">
          <a
            href="#contact"
            className="group flex items-center gap-3 border border-black/15 hover:border-black hover:bg-black hover:text-white text-black font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200"
          >
            Discuss a Project
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

// ── Reusable project card ──────────────────────────────────────
const ProjectCard = ({ project, index, cardRef, onOpen }) => (
  <div
    ref={cardRef}
    className="bg-white flex flex-col overflow-hidden cursor-pointer"
  >
    {/* Image */}
    <div className="relative h-56 overflow-hidden bg-black/5 shrink-0">
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover grayscale"
      />
      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

      {/* Index eyebrow */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <span className="w-4 h-px bg-white/50" />
        <span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-white/55">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Platform tag */}
      <div className="absolute top-4 right-4">
        <span className="text-[9px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 bg-black/75 text-white border border-white/15">
          {project.platform}
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="px-7 pt-5 pb-7 flex flex-col gap-4 flex-1">
      {/* Title */}
      <h3 className="text-[clamp(1.3rem,2.5vw,1.75rem)] font-black uppercase tracking-tight leading-none">
        {project.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm text-black/50 leading-relaxed"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="proj-tag text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 border border-black/12 text-black/50"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="proj-tag text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 border border-black/12 text-black/50">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5 border-t border-black/8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="details-btn flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-black"
            onClick={() => onOpen(project)}
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          {project.platform === "Custom" && project.githubLink !== "#" ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-black/40 hover:text-black transition-colors"
            >
              <GitHubIcon className="h-3 w-3" />
              GitHub
            </a>
          ) : (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-black/40 hover:text-black transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Visit Site
            </a>
          )}
        </div>
        <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/25">
          {project.year ?? "2025"}
        </span>
      </div>
    </div>
  </div>
);

export default Projects;