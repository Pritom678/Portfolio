import { Code2, Coffee, Gamepad2, Music } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const textContentRef = useRef(null);
  const highlightCardsRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .from(headerRef.current.children[0], {
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
        );

      // Text content animation
      gsap.fromTo(
        textContentRef.current.children,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: textContentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current.children,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Highlight cards animation
      gsap.fromTo(
        highlightCardsRef.current.children,
        {
          x: 100,
          opacity: 0,
          rotationY: 45,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: highlightCardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for highlight cards
      const highlightCards = highlightCardsRef.current.children;
      Array.from(highlightCards).forEach((card) => {
        const icon = card.querySelector(".icon-container");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Hover animations for stats
      const statCards = statsRef.current.children;
      Array.from(statCards).forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Floating animation for highlight cards
      Array.from(highlightCards).forEach((card, index) => {
        gsap.to(card, {
          y: "+=8",
          duration: 2.5 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.4,
        });
      });
    },
    { scope: containerRef }
  );

  const highlights = [
    {
      icon: Code2,
      label: "Clean Code",
      description: "Writing maintainable, scalable code",
    },
    {
      icon: Coffee,
      label: "Problem Solver",
      description: "Turning complex ideas into simple solutions",
    },
    {
      icon: Gamepad2,
      label: "Gaming",
      description: "Competitive gaming in my downtime",
    },
    { icon: Music, label: "Music", description: "Coding with lo-fi beats" },
  ];

  return (
    <section id="about" className="py-32 relative" ref={containerRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.03)_0%,transparent_70%)]" />

      <div className="w-full max-w-[95vw] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20" ref={headerRef}>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mt-4">
            Get to Know <span className="text-gradient">Me Better</span>
          </h2>
        </div>

        <div className="grid xl:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-8" ref={textContentRef}>
            <p className="text-xl xl:text-2xl text-muted-foreground leading-relaxed">
              Hey there! I'm{" "}
              <span className="text-foreground font-semibold">Pritom Das</span>,
              a passionate MERN Stack Developer currently pursuing my
              undergraduate degree. My journey into programming started with
              curiosity about how websites work, and it quickly turned into a
              deep passion for building digital experiences.
            </p>

            <p className="text-xl xl:text-2xl text-muted-foreground leading-relaxed">
              I love working on full-stack projects where I can see the complete
              picture – from designing intuitive user interfaces to building
              robust backend systems. There's something incredibly satisfying
              about solving complex problems and watching an idea come to life
              as a functional application.
            </p>

            <p className="text-xl xl:text-2xl text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              playing video games, or listening to music. I believe in
              continuous learning and always push myself to stay updated with
              the latest trends in web development.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8" ref={statsRef}>
              <div className="text-center p-6 rounded-xl glass-card">
                <span className="text-4xl xl:text-5xl font-bold text-gradient">
                  3+
                </span>
                <p className="text-base text-muted-foreground mt-2">Projects</p>
              </div>
              <div className="text-center p-6 rounded-xl glass-card">
                <span className="text-4xl xl:text-5xl font-bold text-gradient">
                  4+
                </span>
                <p className="text-base text-muted-foreground mt-2">
                  Technologies
                </p>
              </div>
              <div className="text-center p-6 rounded-xl glass-card">
                <span className="text-4xl xl:text-5xl font-bold text-gradient">
                  ∞
                </span>
                <p className="text-base text-muted-foreground mt-2">
                  Curiosity
                </p>
              </div>
            </div>
          </div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-2 gap-6" ref={highlightCardsRef}>
            {highlights.map((item) => (
              <div
                key={item.label}
                className="glass-card p-8 rounded-xl hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="icon-container w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                  {item.label}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
