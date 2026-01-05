import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { useState, useRef } from "react";
import ProjectModal from "./ProjectModel.jsx";
import { projects } from "../data/projects.js";
import { GitHubIcon } from "../icons/BrandIcons.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Header animations
      tl.from(headerRef.current.children[0], {
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
          "-=0.6"
        )
        .from(
          headerRef.current.children[2],
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Project cards staggered animation
      gsap.fromTo(
        cardsRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: 45,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for cards
      cardsRef.current.forEach((card) => {
        if (card) {
          const image = card.querySelector("img");
          const quickLinks = card.querySelector(".quick-links");
          const techStack = card.querySelectorAll(".tech-badge");

          // Card hover effect
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(image, {
              scale: 1.1,
              duration: 0.6,
              ease: "power2.out",
            });

            gsap.to(quickLinks, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(techStack, {
              scale: 1.05,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(image, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });

            gsap.to(quickLinks, {
              opacity: 0,
              y: 8,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(techStack, {
              scale: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            });
          });
        }
      });

      // Continuous floating animation for cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: "+=10",
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.3,
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="projects" className="py-32 relative" ref={containerRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,217,255,0.05)_0%,transparent_60%)]" />

      <div className="w-full max-w-[95vw] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20" ref={headerRef}>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mt-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-6 max-w-4xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            passion for building impactful web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="project-card group w-full max-w-sm mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-300"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent" />

                {/* Quick Links */}
                <div className="quick-links absolute top-4 right-4 flex gap-2 opacity-0 translate-y-2">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <GitHubIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.name}
                </h3>

                <p
                  className="text-muted-foreground overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="tech-badge px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-3 py-1.5 rounded-md bg-muted text-muted-foreground text-sm">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <Button
                  variant="ghost"
                  className="w-full mt-4 group/btn hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
