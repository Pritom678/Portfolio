import { Download, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-8"
    >
      {/* Hero Background Container - 95% width */}
      <div className="w-[95vw] h-full min-h-[90vh] relative rounded-2xl overflow-hidden bg-grid-pattern">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,217,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,168,204,0.05)_0%,transparent_50%)]" />

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/30 animate-float" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-primary/20 animate-float animate-delay-300" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-primary/25 animate-float animate-delay-600" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center px-8 py-20">
          <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-16 xl:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center xl:text-left space-y-8 animate-fade-in-left max-w-2xl xl:max-w-none">
              <div className="inline-block px-6 py-3 rounded-full border border-primary/30 bg-primary/5 animate-bounce-in animate-delay-200">
                <span className="text-primary text-sm font-medium">
                  👋 Welcome to my portfolio
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight animate-slide-up animate-delay-300">
                Hi, I'm <span className="text-gradient">Pritom Das</span>
              </h1>

              <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-muted-foreground animate-slide-up animate-delay-400">
                MERN Stack Developer
              </h2>

              <p className="text-xl xl:text-2xl text-muted-foreground max-w-3xl mx-auto xl:mx-0 leading-relaxed animate-fade-in animate-delay-500">
                Crafting scalable, user-centric web applications with modern
                technologies. Passionate about clean code, intuitive design, and
                delivering exceptional digital experiences.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-6 pt-6 animate-fade-in animate-delay-600">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-primary transition-all duration-300 gap-2 hover-lift px-8 py-4 text-lg"
                >
                  <Download className="h-6 w-6" />
                  Download Resume
                </Button>

                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/Pritom678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-lift hover-glow"
                  >
                    <GitHubIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pritom1722002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-lift hover-glow"
                  >
                    <LinkedInIcon className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex-1 flex justify-center xl:justify-end animate-fade-in-right animate-delay-400">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-primary blur-3xl opacity-30 scale-110 animate-pulse-glow" />

                {/* Image Container */}
                <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/30 glow-primary bg-muted flex items-center justify-center hover-lift">
                  <img
                    src="/src/assets/profile-photo.jpg"
                    alt="Pritom Das"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <div className="text-8xl hidden">👨‍💻</div>
                </div>

                {/* Decorative Ring */}
                <div className="absolute -inset-6 rounded-full border border-primary/20 animate-rotate-glow" />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce animate-delay-800">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
