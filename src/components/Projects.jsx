import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { useState } from "react";
import ProjectModal from "./ProjectModel.jsx";
import { projects } from "../data/projects.js";
import { GitHubIcon } from "../icons/BrandIcons.jsx";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(0,217,255,0.05)_0%,_transparent_60%)]" />

      <div className="w-full max-w-[95vw] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mt-4 animate-slide-up animate-delay-200">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-6 max-w-4xl mx-auto animate-fade-in animate-delay-300">
            Here are some of my recent projects that showcase my skills and
            passion for building impactful web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3  gap-8 justify-items-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group animate-scale-in animate-delay-${
                400 + index * 100
              } w-full max-w-sm mx-auto`}
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                {/* Quick Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-lift hover-glow"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-lift hover-glow"
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
                  {project.techStack.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium hover-glow transition-all duration-300 animate-bounce-in animate-delay-${
                        600 + index * 100 + techIndex * 50
                      }`}
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
                  className="w-full mt-4 group/btn hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-lift"
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
