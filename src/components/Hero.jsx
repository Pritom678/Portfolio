import { Download, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";

const Hero = () => {
  const heroRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".anim-nav",
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      );

      tl.fromTo(
        ".anim-eyebrow",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );

      tl.fromTo(
        ".anim-word",
        { yPercent: 110, opacity: 0, rotationZ: 2 },
        { yPercent: 0, opacity: 1, rotationZ: 0, duration: 0.9, stagger: 0.12 },
        "-=0.2"
      );

      tl.fromTo(
        ".anim-body",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );

      tl.fromTo(
        ".anim-cta",
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );

      tl.fromTo(
        ".anim-image-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" },
        "-=0.8"
      );

      tl.fromTo(
        ".anim-stat",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        "-=0.5"
      );

      tl.fromTo(
        ".anim-ticker",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

      tl.fromTo(
        ".anim-scroll-line",
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

      gsap.to(".anim-image-wrap img", {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      const panel = document.querySelector(".anim-right-panel");
      if (panel) {
        const onMove = (e) => {
          const rect = panel.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(panel, {
            rotationY: x * 6,
            rotationX: -y * 4,
            transformPerspective: 900,
            duration: 0.6,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(panel, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        };
        panel.addEventListener("mousemove", onMove);
        panel.addEventListener("mouseleave", onLeave);
        return () => {
          panel.removeEventListener("mousemove", onMove);
          panel.removeEventListener("mouseleave", onLeave);
        };
      }
    },
    { scope: heroRef }
  );

  return (
    <section id="home" ref={heroRef} className="min-h-screen bg-white text-black font-sans overflow-hidden flex flex-col">

      {/* ── HERO BODY ── */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr_480px] min-h-0 p-12 md:p-16 lg:p-24 gap-12 items-center">

        {/* LEFT — centered text */}
        <div className="flex flex-col justify-between py-12 xl:border-r border-black/10 pr-10">
          <div className="space-y-8 text-center xl:text-left flex flex-col items-center xl:items-start">

            {/* Eyebrow */}
            <div className="anim-eyebrow flex items-center gap-3">
              <span className="w-6 h-px bg-black hidden xl:block" />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
                I Design &amp; Build
              </span>
              <span className="w-6 h-px bg-black xl:hidden" />
            </div>

            {/* Headline */}
            <div className="space-y-1 overflow-hidden w-full">
              {["Digital", "Experiences", "That Inspire."].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <h1
                    className={`anim-word text-[clamp(3.5rem,9vw,8.5rem)] font-black leading-[0.9] tracking-tight uppercase
                      ${i === 1 ? "text-white [-webkit-text-stroke:2px_black]" : "text-black"}`}
                  >
                    {word}
                  </h1>
                </div>
              ))}
            </div>

            {/* Body copy */}
            <p className="anim-body text-base md:text-lg text-black/50 max-w-lg leading-relaxed">
              I help brands create meaningful connections through clean code, thoughtful design, and strategic thinking.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-5">
              <a
                href="/pritom (2).pdf"
                download="Pritom_Das_Resume.pdf"
                className="anim-cta group flex items-center gap-3 bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-black/80 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download CV
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#projects"
                className="anim-cta flex items-center gap-2 text-black/50 hover:text-black text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                View My Work
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Socials */}
            <div className="anim-cta flex items-center gap-3">
              <a
                href="https://github.com/Pritom678"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-black/15 hover:border-black hover:bg-black hover:text-white transition-all duration-200 text-black/50"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/pritom1722002"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-black/15 hover:border-black hover:bg-black hover:text-white transition-all duration-200 text-black/50"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <span className="text-[10px] text-black/30 tracking-[0.3em] uppercase ml-2">
                Based in Dhaka, BD
              </span>
            </div>
          </div>

          {/* Stack tags row */}
          <div className="anim-cta hidden xl:flex items-center gap-0 mt-10">
            {["React", "Node.js", "MongoDB", "Express", "Tailwind"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-2 border-r border-black/10 first:border-l text-black/30 hover:text-black hover:bg-black/5 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — photo + stats with 3D tilt */}
        <div className="anim-right-panel flex flex-col border-t xl:border-t-0 pl-10" style={{ transformStyle: "preserve-3d" }}>

          {/* Photo */}
          <div className="anim-image-wrap relative flex-1 overflow-hidden bg-black/5 min-h-[50vh] xl:min-h-0">
            <img
              src="https://res.cloudinary.com/do3iu9q7d/image/upload/v1767634713/profile_wnzqr0.jpg"
              alt="Pritom Das"
              className="w-full h-full object-cover object-top grayscale"
            />
            {/* Overlay labels */}
            <div className="absolute top-5 right-5 text-right">
              <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-white/70">Available for projects</p>
              <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-white/70 mt-0.5">Based in Dhaka</p>
            </div>
            {/* Available dot */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
              </span>
              <span className="text-[9px] font-semibold tracking-widest uppercase text-white/60">Open to work</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Stats 2×2 */}
          <div className="grid grid-cols-2 border-t border-black/10">
            {[
              { value: "3+", label: "Projects Done" },
              { value: "MERN", label: "Core Stack" },
              { value: "2026", label: "Current Focus" },
              { value: "100%", label: "Commitment" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`anim-stat p-6 border-black/10 hover:bg-black hover:text-white transition-colors duration-300 group
                  ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}
              >
                <p className="text-2xl font-black leading-none group-hover:scale-110 transition-transform duration-300 origin-left">
                  {stat.value}
                </p>
                <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-black/40 group-hover:text-white/50 mt-1.5 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TICKER STRIP ── */}
      <div className="anim-ticker border-t border-black/10 overflow-hidden">
        <div
          className="flex items-center py-3 whitespace-nowrap"
          style={{ animation: "ticker 22s linear infinite" }}
        >
          {Array(4)
            .fill(["Web Development", "UI Engineering", "MERN Stack", "React", "Clean Design", "Freelance Available"])
            .flat()
            .map((item, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/30 px-8 border-r border-black/10 shrink-0"
              >
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-28 left-10 hidden xl:flex flex-col items-center gap-3">
        <div className="anim-scroll-line w-px h-14 bg-black/25" />
        <span
          className="text-[9px] tracking-[0.4em] uppercase text-black/25"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;