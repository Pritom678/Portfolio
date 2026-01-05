import { Heart } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-16 border-t border-border animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-bold text-gradient hover-lift transition-all duration-300 animate-fade-in-left"
          >
            PD<span className="text-foreground">.</span>
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1 animate-fade-in animate-delay-200">
            © {currentYear} Pritom Das. Made with{" "}
            <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 animate-fade-in-right animate-delay-300">
            <a
              href="https://github.com/Pritom678"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover-lift hover-glow"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/pritom1722002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover-lift hover-glow"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
