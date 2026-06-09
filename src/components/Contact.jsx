import { Mail, Phone, MessageCircle, Send, MapPin, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "pritomdas6783@gmail.com",
    href: "mailto:pritomdas6783@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1608944818",
    href: "tel:+8801608944818",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+880 1889557719",
    href: "https://wa.me/8801889557719",
  },
];

const Contact = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Eyebrow + headline words clip up
    gsap.fromTo(
      ".contact-eyebrow",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-header", start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    gsap.fromTo(
      ".contact-headline-word",
      { yPercent: 110, opacity: 0, rotationZ: 1.5 },
      {
        yPercent: 0, opacity: 1, rotationZ: 0,
        duration: 0.9, stagger: 0.1, ease: "power4.out",
        scrollTrigger: { trigger: ".contact-header", start: "top 82%", toggleActions: "play none none reverse" },
      }
    );

    gsap.fromTo(
      ".contact-subtext",
      { y: 25, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-header", start: "top 78%", toggleActions: "play none none reverse" },
      }
    );

    // Divider grows
    gsap.fromTo(
      ".contact-divider",
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1, duration: 1, ease: "power3.inOut",
        scrollTrigger: { trigger: ".contact-header", start: "top 75%", toggleActions: "play none none reverse" },
      }
    );

    // Contact cards wipe in
    gsap.fromTo(
      ".contact-card",
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      {
        clipPath: "inset(0 0% 0 0)", opacity: 1,
        duration: 0.75, stagger: 0.12, ease: "power3.inOut",
        scrollTrigger: { trigger: ".contact-cards", start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    // CTA block slides up
    gsap.fromTo(
      ".contact-cta",
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-cta", start: "top 88%", toggleActions: "play none none reverse" },
      }
    );

    // Card hover — invert to black
    document.querySelectorAll(".contact-card").forEach((card) => {
      const icon = card.querySelector(".card-icon");
      const label = card.querySelector(".card-label");
      const value = card.querySelector(".card-value");
      const arrow = card.querySelector(".card-arrow");

      card.addEventListener("mouseenter", () => {
        gsap.to(card, { backgroundColor: "#000", borderColor: "#000", duration: 0.22, ease: "power2.out" });
        gsap.to([label, value], { color: "#fff", duration: 0.18 });
        gsap.to(icon, { backgroundColor: "rgba(255,255,255,0.12)", color: "#fff", scale: 1.1, duration: 0.22 });
        gsap.to(arrow, { opacity: 1, x: 2, y: -2, duration: 0.2 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.1)", duration: 0.22 });
        gsap.to([label, value], { color: "", duration: 0.18 });
        gsap.to(icon, { backgroundColor: "rgba(0,0,0,0.05)", color: "#000", scale: 1, duration: 0.22 });
        gsap.to(arrow, { opacity: 0, x: 0, y: 0, duration: 0.2 });
      });
    });

    // CTA email button hover
    const emailBtn = document.querySelector(".contact-email-btn");
    if (emailBtn) {
      emailBtn.addEventListener("mouseenter", () =>
        gsap.to(emailBtn, { backgroundColor: "rgba(0,0,0,0.82)", duration: 0.22 })
      );
      emailBtn.addEventListener("mouseleave", () =>
        gsap.to(emailBtn, { backgroundColor: "#000", duration: 0.22 })
      );
    }

  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-28 pb-36 bg-white text-black overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 md:px-14">

        {/* ── HEADER ── */}
        <div className="contact-header mb-16 md:mb-20">
          <div className="contact-eyebrow flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-black" />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">
              Get In Touch
            </span>
          </div>

          <div className="space-y-1 mb-8">
            {["Let's Build", "Something", "Distinct."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <h2
                  className={`contact-headline-word text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.9] tracking-tight uppercase
                    ${i === 1 ? "text-white [-webkit-text-stroke:2px_black]" : "text-black"}`}
                >
                  {line}
                </h2>
              </div>
            ))}
          </div>

          <p className="contact-subtext text-base md:text-lg text-black/50 max-w-xl leading-relaxed mb-8">
            If you need a site that feels elevated, minimal, and ready for clients or hiring managers — I'd love to discuss the direction.
          </p>

          <div className="contact-divider w-full h-px bg-black/10" />
        </div>

        {/* ── CONTACT CARDS ── */}
        <div className="contact-cards grid md:grid-cols-3 gap-3 mb-3">
          {contactInfo.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.label === "WhatsApp" ? "_blank" : undefined}
              rel={contact.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className="contact-card group border border-black/10 p-7 flex flex-col gap-5 bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="card-icon w-11 h-11 bg-black/5 flex items-center justify-center text-black">
                  <contact.icon className="h-4 w-4" />
                </div>
                <ArrowUpRight className="card-arrow h-4 w-4 text-white opacity-0" />
              </div>
              <div>
                <p className="card-label text-[10px] font-semibold tracking-[0.3em] uppercase text-black/40 mb-1">
                  {contact.label}
                </p>
                <p className="card-value text-sm font-medium text-black break-all">
                  {contact.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* ── CTA BLOCK ── */}
        <div className="contact-cta border border-black/10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div className="space-y-5 max-w-xl">
            <div className="flex items-center gap-2 text-black/40">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">
                Based in Bangladesh
              </span>
            </div>

            <h3 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[0.95] tracking-tight uppercase">
              Ready to Start<br />a Project?
            </h3>

            <p className="text-base text-black/50 leading-relaxed">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <a
              href="mailto:pritomdas6783@gmail.com"
              className="contact-email-btn group flex items-center gap-3 bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              Send an Email
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="https://wa.me/8801889557719"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-black/15 hover:border-black text-black font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors hover:bg-black hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp Me
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;