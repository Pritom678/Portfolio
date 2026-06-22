import { ArrowUpRight, Download } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";

const Hero = () => {
  const heroRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".anim-eyebrow", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
      tl.fromTo(".anim-word", { yPercent: 110, opacity: 0, rotationZ: 2 }, { yPercent: 0, opacity: 1, rotationZ: 0, duration: 0.9, stagger: 0.12 }, "-=0.2");
      tl.fromTo(".anim-body", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");
      tl.fromTo(".anim-cta", { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }, "-=0.4");
      tl.fromTo(".anim-image-wrap", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" }, "-=0.8");
      tl.fromTo(".anim-stat", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.5");
      tl.fromTo(".anim-ticker", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
      tl.fromTo(".anim-scroll-line", { scaleY: 0, transformOrigin: "top center" }, { scaleY: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");

      gsap.to(".anim-image-wrap img", { y: -10, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

      const panel = document.querySelector(".anim-right-panel");
      if (panel) {
        const onMove = (e) => {
          const rect = panel.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(panel, { rotationY: x * 6, rotationX: -y * 4, transformPerspective: 900, duration: 0.6, ease: "power2.out" });
        };
        const onLeave = () => gsap.to(panel, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" });
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
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr_440px] min-h-0 px-5 pt-28 pb-8 sm:px-8 sm:pt-32 sm:pb-12 md:px-14 md:pt-36 md:pb-16 lg:px-20 lg:py-20 xl:px-24 xl:py-24 gap-8 xl:gap-12 items-center">

        {/* LEFT */}
        <div className="flex flex-col justify-between xl:border-r border-black/10 xl:pr-10">
          <div className="space-y-6 sm:space-y-8 text-center xl:text-left flex flex-col items-center xl:items-start">

            {/* Eyebrow — hidden on very small screens to avoid navbar collision */}
            <div className="anim-eyebrow hidden sm:flex items-center gap-3">
              <span className="w-6 h-px bg-black hidden xl:block" aria-hidden="true" />
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] sm:tracking-[0.35em] uppercase text-black/40">
                Wix · Squarespace · Custom Code
              </span>
              <span className="w-6 h-px bg-black xl:hidden" aria-hidden="true" />
            </div>

            {/* Headline — single <h1> with styled spans */}
            <h1 className="space-y-0.5 overflow-hidden w-full text-left" aria-label="Web Developer For Modern Businesses">
              {["Web Developer", "For Modern", "Businesses."].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <span
                    className={`anim-word block text-[clamp(2.6rem,8vw,8.5rem)] font-black leading-[0.88] tracking-tight uppercase
                      ${i === 1 ? "text-white [-webkit-text-stroke:2px_black]" : "text-black"}`}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </h1>

            {/* Body copy */}
            <p className="anim-body text-sm sm:text-base md:text-lg text-black/50 max-w-md sm:max-w-lg leading-relaxed">
              I build high-converting websites on Wix, Squarespace, and custom code — designed to grow your business, attract clients, and make your brand look professional from day one.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4">
              <a
                href="#projects"
                className="anim-cta group flex items-center gap-3 bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-black/80 transition-colors"
              >
                View Projects
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
              <a
                href="/pritom (2).pdf"
                download="Pritom_Das_Resume.pdf"
                className="anim-cta group flex items-center gap-2 border border-black/20 hover:border-black hover:bg-black hover:text-white text-black text-xs font-semibold tracking-[0.2em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-200"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Download CV
              </a>
              <a
                href="#contact"
                className="anim-cta flex items-center gap-2 text-black/50 hover:text-black text-xs font-semibold tracking-[0.2em] uppercase transition-colors py-3.5 sm:py-4"
              >
                Contact Me
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Socials */}
            <div className="anim-cta flex items-center gap-3 flex-wrap justify-center xl:justify-start">
              <a
                href="https://github.com/Pritom678"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2.5 border border-black/15 hover:border-black hover:bg-black hover:text-white transition-all duration-200 text-black/50"
              >
                <GitHubIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/pritom1722002"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-2.5 border border-black/15 hover:border-black hover:bg-black hover:text-white transition-all duration-200 text-black/50"
              >
                <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <span className="text-[9px] text-black/30 tracking-[0.3em] uppercase ml-1">
                Based in Dhaka, BD
              </span>
            </div>
          </div>

          {/* Stack tags — desktop only */}
          <div className="anim-cta hidden xl:flex items-center gap-0 mt-10">
            {["Wix", "Squarespace", "React", "HTML/CSS", "JavaScript"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-2 border-r border-black/10 first:border-l text-black/30 hover:text-black hover:bg-black/5 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — photo + stats */}
        <div className="anim-right-panel flex flex-col border-t xl:border-t-0 w-full" style={{ transformStyle: "preserve-3d" }}>

          {/* Photo */}
          <div className="anim-image-wrap relative overflow-hidden bg-black/5" style={{ minHeight: "280px", maxHeight: "480px", height: "45vw" }}>
            <img
              src="https://res.cloudinary.com/do3iu9q7d/image/upload/w_880,f_auto,q_auto/v1767634713/profile_wnzqr0.jpg"
              alt="Pritom Das — Freelance Web Developer"
              width="440"
              height="560"
              loading="eager"
              className="w-full h-full object-cover object-top grayscale"
            />
            <div className="absolute top-4 right-4 text-right" aria-hidden="true">
              <p className="text-[8px] sm:text-[9px] font-semibold tracking-[0.3em] uppercase text-white/70">Available for projects</p>
              <p className="text-[8px] sm:text-[9px] font-semibold tracking-[0.3em] uppercase text-white/70 mt-0.5">Based in Dhaka</p>
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2" aria-hidden="true">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold tracking-widest uppercase text-white/70">Open to work</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
          </div>

          {/* Stats 2×2 */}
          <div className="grid grid-cols-2 border-t border-black/10">
            {[
              { value: "7+", label: "Projects Built" },
              { value: "24hr", label: "Response Time" },
              { value: "3", label: "Platforms" },
              { value: "100%", label: "On-Time Delivery" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`anim-stat p-4 sm:p-6 border-black/10 hover:bg-black hover:text-white transition-colors duration-300 group
                  ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}
              >
                <p className="text-xl sm:text-2xl font-black leading-none group-hover:scale-110 transition-transform duration-300 origin-left">
                  {stat.value}
                </p>
                <p className="text-[9px] sm:text-[10px] font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black/40 group-hover:text-white/50 mt-1.5 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TICKER STRIP ── */}
      <div className="anim-ticker border-t border-black/10 overflow-hidden" aria-hidden="true">
        <div className="flex items-center py-3 whitespace-nowrap ticker-track">
          {Array(4)
            .fill(["Wix Development", "Squarespace Development", "Custom Code", "React", "High-Converting Websites", "Freelance Available"])
            .flat()
            .map((item, i) => (
              <span key={i} className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase text-black/30 px-5 sm:px-8 border-r border-black/10 shrink-0">
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-28 left-10 hidden xl:flex flex-col items-center gap-3" aria-hidden="true">
        <div className="anim-scroll-line w-px h-14 bg-black/25" />
        <span className="text-[9px] tracking-[0.4em] uppercase text-black/25" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
      </div>
    </section>
  );
};

export default Hero;
