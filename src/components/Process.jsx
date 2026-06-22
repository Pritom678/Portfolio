import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MessageSquare, Pencil, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery",
    description:
      "We kick off with a focused conversation about your goals, audience, and brand. I ask the right questions so the build starts with a clear direction — no guesswork.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Design & Plan",
    description:
      "I map out the structure, content layout, and visual direction. You'll know exactly what's being built before a single line of code is written.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description:
      "Your site is built with clean structure, fast performance, and mobile-first design. You'll see regular progress and can give feedback at every stage.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Handoff",
    description:
      "Once you're happy, we go live. I handle the technical side and hand over everything you need to manage your site with confidence going forward.",
  },
];

const Process = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".process-eyebrow", { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".process-title-word", { yPercent: 110, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power4.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 82%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".process-step", { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" }, {
      y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.75, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".process-grid", start: "top 82%", toggleActions: "play none none reverse" },
    });

    document.querySelectorAll(".process-step").forEach((step) => {
      const icon = step.querySelector(".step-icon");
      const num = step.querySelector(".step-num");
      step.addEventListener("mouseenter", () => {
        gsap.to(step, { backgroundColor: "#000", borderColor: "#000", duration: 0.25, ease: "power2.out" });
        gsap.to([icon, num], { color: "#fff", duration: 0.2 });
        gsap.to(step.querySelectorAll("p, h3"), { color: "#fff", duration: 0.2 });
        gsap.to(icon, { backgroundColor: "rgba(255,255,255,0.1)", duration: 0.2 });
      });
      step.addEventListener("mouseleave", () => {
        gsap.to(step, { backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.1)", duration: 0.25 });
        gsap.to([icon, num], { color: "", duration: 0.2 });
        gsap.to(step.querySelectorAll("p, h3"), { color: "", duration: 0.2 });
        gsap.to(icon, { backgroundColor: "rgba(0,0,0,0.05)", duration: 0.2 });
      });
    });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <div className="process-eyebrow flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-4 h-px bg-black/30" aria-hidden="true" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">How I Work</p>
          </div>
          <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-0 mb-5 sm:mb-6">
            {["The", "Process."].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <h2 className={`process-title-word text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-[0.88]
                  ${i === 1 ? "text-white [-webkit-text-stroke:2.5px_black]" : "text-black"}`}>
                  {word}
                </h2>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-black/10" />
        </div>

        {/* Steps */}
        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-black/10" style={{ gap: "1px", background: "rgba(0,0,0,0.1)" }}>
          {steps.map((step) => (
            <div key={step.number} className="process-step bg-white px-6 sm:px-7 py-8 sm:py-10 flex flex-col gap-5 cursor-default">
              <div className="flex items-start justify-between">
                <div className="step-icon w-11 h-11 bg-black/5 flex items-center justify-center text-black shrink-0">
                  <step.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="step-num text-[10px] font-semibold tracking-[0.35em] uppercase text-black/25">{step.number}</span>
              </div>
              <div className="w-full h-px bg-black/8" />
              <h3 className="text-lg font-black uppercase tracking-tight leading-none text-black">{step.title}</h3>
              <p className="text-xs text-black/50 leading-relaxed flex-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
