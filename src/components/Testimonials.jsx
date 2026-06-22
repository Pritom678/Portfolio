import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Pritom delivered our Squarespace site ahead of schedule and it looked exactly how we envisioned. The attention to detail was outstanding — every section was clean, fast, and easy to manage.",
    name: "Sarah Mitchell",
    role: "Founder, Fivestone Realty",
    platform: "Squarespace",
  },
  {
    id: 2,
    quote:
      "Our Wix website went from a template mess to a professional brand showcase. Pritom understood our industry and built a site that actually brings in inquiries. Highly recommend.",
    name: "Marco Rossi",
    role: "Owner, Italia Foods",
    platform: "Wix",
  },
  {
    id: 3,
    quote:
      "The custom-coded site Pritom built for us performs incredibly well. Fast load times, smooth animations, and a design that stands out. Communication throughout was excellent.",
    name: "Ji-yeon Park",
    role: "Director, Inspire Me Korea",
    platform: "Custom Code",
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".testi-eyebrow", { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".testi-title-word", { yPercent: 110, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power4.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 82%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".testi-card", { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" }, {
      y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: ".testi-grid", start: "top 82%", toggleActions: "play none none reverse" },
    });

    document.querySelectorAll(".testi-card").forEach((card) => {
      card.addEventListener("mouseenter", () =>
        gsap.to(card, { backgroundColor: "#000", borderColor: "#000", color: "#fff", duration: 0.25, ease: "power2.out" })
      );
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.1)", color: "#000", duration: 0.25 })
      );
    });
  }, { scope: containerRef });

  return (
    <section id="testimonials" ref={containerRef} className="py-16 sm:py-20 md:py-28 bg-white text-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <div className="testi-eyebrow flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-4 h-px bg-black/30" aria-hidden="true" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">Client Feedback</p>
          </div>
          <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-0 mb-5 sm:mb-6">
            {["What Clients", "Say."].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <h2 className={`testi-title-word text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-[0.88]
                  ${i === 1 ? "text-white [-webkit-text-stroke:2.5px_black]" : "text-black"}`}>
                  {word}
                </h2>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-black/10" />
        </div>

        {/* Cards */}
        <div className="testi-grid grid grid-cols-1 md:grid-cols-3 border border-black/10" style={{ gap: "1px", background: "rgba(0,0,0,0.1)" }}>
          {testimonials.map((t) => (
            <article key={t.id} className="testi-card bg-white px-6 sm:px-8 py-8 sm:py-10 flex flex-col gap-6 cursor-default transition-colors duration-250">
              <Quote className="h-6 w-6 opacity-20 shrink-0" aria-hidden="true" />
              <blockquote className="text-sm leading-relaxed text-black/60 flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="border-t border-black/10 pt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-tight">{t.name}</p>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/40 mt-0.5">{t.role}</p>
                </div>
                <span className="text-[9px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 border border-black/15 text-black/50 shrink-0">
                  {t.platform}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
