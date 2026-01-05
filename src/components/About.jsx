import { Code2, Coffee, Gamepad2, Music } from "lucide-react";

const About = () => {
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
    <section id="about" className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,217,255,0.03)_0%,_transparent_70%)]" />

      <div className="w-full max-w-[95vw] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mt-4 animate-slide-up animate-delay-200">
            Get to Know <span className="text-gradient">Me Better</span>
          </h2>
        </div>

        <div className="grid xl:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-left animate-delay-300">
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
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-6 rounded-xl glass-card hover-lift animate-bounce-in animate-delay-500">
                <span className="text-4xl xl:text-5xl font-bold text-gradient">
                  3+
                </span>
                <p className="text-base text-muted-foreground mt-2">Projects</p>
              </div>
              <div className="text-center p-6 rounded-xl glass-card hover-lift animate-bounce-in animate-delay-600">
                <span className="text-4xl xl:text-5xl font-bold text-gradient">
                  4+
                </span>
                <p className="text-base text-muted-foreground mt-2">
                  Technologies
                </p>
              </div>
              <div className="text-center p-6 rounded-xl glass-card hover-lift animate-bounce-in animate-delay-700">
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
          <div className="grid grid-cols-2 gap-6 animate-fade-in-right animate-delay-400">
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className={`glass-card p-8 rounded-xl hover:border-primary/50 transition-all duration-300 group hover-lift animate-scale-in animate-delay-${
                  500 + index * 100
                }`}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors hover-glow">
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
