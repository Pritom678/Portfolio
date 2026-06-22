import { useEffect, useRef, useCallback } from "react";
import { ExternalLink, X, Rocket, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GitHubIcon } from "../icons/BrandIcons";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const titleId = "modal-title";

  // ── Focus trap ────────────────────────────────────────────────
  const trapFocus = useCallback((e) => {
    if (!contentRef.current) return;
    const focusable = Array.from(contentRef.current.querySelectorAll(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Move focus into modal
      const firstFocusable = contentRef.current?.querySelector(FOCUSABLE);
      setTimeout(() => firstFocusable?.focus(), 50);
      document.addEventListener("keydown", trapFocus);
    }
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen, trapFocus]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useGSAP(() => {
    if (!isOpen || !modalRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    tl.fromTo(contentRef.current, { y: 80, clipPath: "inset(100% 0 0 0)" }, { y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.6 }, "-=0.2");
    tl.fromTo(".modal-image", { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7 }, "-=0.4");
    tl.fromTo(".modal-divider", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.3");
    tl.fromTo(".modal-title-word", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power4.out" }, "-=0.5");
    tl.fromTo(".modal-item", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07 }, "-=0.4");
  }, { scope: modalRef, dependencies: [isOpen] });

  if (!isOpen || !project) return null;

  const titleWords = project.name.split(" ");

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={contentRef}
        className="relative w-full md:max-w-2xl max-h-[92vh] overflow-y-auto bg-white text-black border-t md:border border-black/10 shadow-2xl flex flex-col"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 border border-black/15 text-black hover:bg-black hover:text-white hover:border-black transition-all duration-200"
          aria-label="Close project details"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Image */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden shrink-0 bg-black/5">
          <img
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            width="672"
            height="256"
            loading="lazy"
            className="modal-image w-full h-full object-cover grayscale"
          />
          <div className="absolute top-5 left-5 flex items-center gap-2" aria-hidden="true">
            <span className="w-4 h-px bg-white/60" />
            <span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-white/60">{project.platform}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="px-6 sm:px-7 md:px-10 pb-10 pt-2 space-y-6 sm:space-y-7">

          {/* Title */}
          <h2 id={titleId} className="flex flex-wrap gap-x-3 gap-y-0" aria-label={project.name}>
            {titleWords.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span
                  className={`modal-title-word block text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-[0.9] tracking-tight uppercase
                    ${i === 1 ? "text-white [-webkit-text-stroke:2px_black]" : "text-black"}`}
                >
                  {word}
                </span>
              </div>
            ))}
          </h2>

          <div className="modal-divider w-full h-px bg-black/10" />

          {/* Tech Stack */}
          <div className="modal-item space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-4 h-px bg-black/30" aria-hidden="true" />
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">Tech Stack</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="modal-tech-tag text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 border border-black/12 text-black/60 cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="modal-item space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-4 h-px bg-black/30" aria-hidden="true" />
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">About This Project</p>
            </div>
            <p className="text-sm text-black/55 leading-relaxed">{project.description}</p>
          </div>

          {/* Key Deliverables / Future Plans */}
          <div className="modal-item space-y-3">
            <div className="flex items-center gap-3">
              <Rocket className="h-3 w-3 text-black/30" aria-hidden="true" />
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
                {project.platform === "Custom" ? "Future Plans" : "Key Deliverables"}
              </p>
            </div>
            <p className="text-sm text-black/55 leading-relaxed">{project.futureImprovements}</p>
          </div>

          <div className="modal-item w-full h-px bg-black/10" />

          {/* CTA buttons */}
          <div className="modal-item flex flex-col sm:flex-row gap-3">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 flex items-center justify-center gap-2 bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-6 py-4 hover:bg-black/80 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              {project.platform === "Custom" ? "Live Demo" : "View Live Site"}
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto" aria-hidden="true" />
            </a>
            {project.platform === "Custom" && project.githubLink !== "#" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 flex items-center justify-center gap-2 border border-black/15 hover:border-black hover:bg-black hover:text-white text-black font-bold text-xs tracking-[0.2em] uppercase px-6 py-4 transition-all duration-200"
              >
                <GitHubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                View Code
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
