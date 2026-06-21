import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useGSAP(() => {
    gsap.fromTo(".footer-divider", { scaleX: 0, transformOrigin: "left center" }, {
      scaleX: 1, duration: 1.2, ease: "power3.inOut",
      scrollTrigger: { trigger: containerRef.current, start: "top 95%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".footer-cta-word", { yPercent: 110, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power4.out",
      scrollTrigger: { trigger: ".footer-cta", start: "top 90%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".footer-bottom-item", { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ".footer-bottom", start: "top 98%", toggleActions: "play none none reverse" },
    });

    document.querySelectorAll(".footer-social").forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(el, { backgroundColor: "#000", color: "#fff", borderColor: "#000", duration: 0.2 }));
      el.addEventListener("mouseleave", () => gsap.to(el, { backgroundColor: "#fff", color: "#000", borderColor: "rgba(0,0,0,0.15)", duration: 0.2 }));
    });

    const topBtn = document.querySelector(".footer-top-btn");
    if (topBtn) {
      topBtn.addEventListener("mouseenter", () => gsap.to(topBtn, { backgroundColor: "#000", color: "#fff", borderColor: "#000", duration: 0.2 }));
      topBtn.addEventListener("mouseleave", () => gsap.to(topBtn, { backgroundColor: "#fff", color: "#000", borderColor: "rgba(0,0,0,0.15)", duration: 0.2 }));
    }
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="bg-white text-black overflow-hidden">

      <div className="footer-divider w-full h-px bg-black/10" />

      {/* ── BIG CTA ── */}
      <div className="footer-cta max-w-[1200px] mx-auto px-5 sm:px-8 md:px-14 pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-10 md:pb-12 border-b border-black/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8">
          <div className="space-y-0">
            {["Start Your", "Next Project."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <p className={`footer-cta-word text-[clamp(2rem,6vw,5.5rem)] font-black leading-[0.92] tracking-tight uppercase
                  ${i === 1 ? "text-white [-webkit-text-stroke:2px_black]" : "text-black"}`}>
                  {line}
                </p>
              </div>
            ))}
          </div>
          <a href="mailto:pritomdas6783@gmail.com"
            className="group flex items-center gap-3 bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-black/80 transition-colors shrink-0 w-full sm:w-auto justify-center sm:justify-start">
            Contact Me
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="footer-bottom max-w-[1200px] mx-auto px-5 sm:px-8 md:px-14 py-6 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
        <a href="#home" className="footer-bottom-item flex items-center gap-2 group">
          <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <span className="text-white font-black text-[10px]">P</span>
          </span>
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-black">Pritom Das</span>
        </a>

        <p className="footer-bottom-item text-[10px] font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black/35 text-center">
          © {currentYear} Pritom Das — Built with a minimal, client-ready approach.
        </p>

        <div className="footer-bottom-item flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          <a href="https://github.com/Pritom678" target="_blank" rel="noopener noreferrer"
            className="footer-social p-2.5 border border-black/15 text-black transition-none">
            <GitHubIcon className="h-3.5 w-3.5" />
          </a>
          <a href="https://www.linkedin.com/in/pritom1722002" target="_blank" rel="noopener noreferrer"
            className="footer-social p-2.5 border border-black/15 text-black transition-none">
            <LinkedInIcon className="h-3.5 w-3.5" />
          </a>
          <a href="#home"
            className="footer-top-btn flex items-center gap-2 border border-black/15 text-black text-[10px] font-semibold tracking-[0.2em] uppercase px-3 sm:px-4 py-2.5 transition-none ml-1">
            Back to Top
            <ArrowUpRight className="h-3 w-3 -rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
