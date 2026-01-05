import { ExternalLink, X, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import { GitHubIcon } from "../icons/BrandIcons";

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Project Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {project.name}
            </h2>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Description
            </h3>
            <p className="text-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Future Improvements */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Rocket className="h-4 w-4 text-primary" />
              Future Plans
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.futureImprovements}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              asChild
              className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground"
            >
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-4 w-4 mr-2" />
                View Code
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
