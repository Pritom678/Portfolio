import { Download, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";

const Hero = () => {
  const heroRef = useRef();
  const textRef = useRef();
  const imageRef = useRef();
  const particlesRef = useRef();
  const ctaRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        heroRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotationY: -15,
          transformPerspective: 1000,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        textRef.current.children,
        {
          y: 100,
          opacity: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -50px",
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      tl.fromTo(
        imageRef.current,
        {
          scale: 0,
          rotation: 180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.8"
      );

      gsap.set(particlesRef.current.children, {
        opacity: 0,
        scale: 0,
      });

      tl.to(
        particlesRef.current.children,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.5"
      );

      tl.fromTo(
        ctaRef.current.children,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.3"
      );

      gsap.to(particlesRef.current.children[0], {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(particlesRef.current.children[1], {
        y: -15,
        x: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      gsap.to(particlesRef.current.children[2], {
        y: -25,
        x: -5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      gsap.to(imageRef.current.querySelector(".glow-effect"), {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: heroRef }
  );

  return (
    <>
      <div className="absolute h-[140vh] inset-0 bg-grid-pattern" />

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden "
      >
        {/* FULL WIDTH GRID BACKGROUND */}

        {/* Radial light overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,217,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,168,204,0.05)_0%,transparent_50%)]" />

        {/* Floating Particles */}
        <div ref={particlesRef}>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/30" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-primary/20" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-primary/25" />
        </div>

        {/* Hero Content Container */}
        <div
          ref={heroRef}
          className="w-screen mx-auto h-full min-h-[90vh] relative rounded-2xl overflow-hidden"
        >
          <div className="relative z-10 h-full flex items-center px-8 py-20">
            <div className="w-full mx-20 flex flex-col xl:flex-row items-center justify-between gap-16 xl:gap-20">
              {/* Text Content */}
              <div
                ref={textRef}
                className="flex-1 text-center xl:text-left space-y-8 max-w-2xl xl:max-w-none"
              >
                <div className="inline-block px-6 py-3 rounded-full border border-primary/30 bg-primary/5">
                  <span className="text-primary text-sm font-medium">
                    👋 Welcome to my portfolio
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
                  Hi, I'm <span className="text-gradient">Pritom Das</span>
                </h1>

                <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-muted-foreground">
                  MERN Stack Developer
                </h2>

                <p className="text-xl xl:text-2xl text-muted-foreground max-w-3xl mx-auto xl:mx-0 leading-relaxed">
                  Crafting scalable, user-centric web applications with modern
                  technologies. Passionate about clean code, intuitive design,
                  and delivering exceptional digital experiences.
                </p>

                <div
                  ref={ctaRef}
                  className="flex flex-col sm:flex-row items-center xl:items-start gap-6 pt-4"
                >
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
              <div
                ref={imageRef}
                className="flex-1 flex justify-center xl:justify-end"
              >
                <div className="relative">
                  <div className="glow-effect absolute inset-0 rounded-full bg-gradient-primary blur-3xl opacity-30 scale-110" />

                  <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/30 glow-primary bg-muted flex items-center justify-center hover-lift">
                    <img
                      src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1767634713/profile_wnzqr0.jpg"
                      alt="Pritom Das"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute -inset-6 rounded-full border border-primary/20" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Scroll
              </span>
              <ChevronDown className="h-5 w-5 text-primary animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
