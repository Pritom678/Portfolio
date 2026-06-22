import { Mail, Phone, MessageCircle, Send, MapPin, ArrowUpRight, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const contactInfo = [
  { icon: Mail, label: "Email", value: "pritomdas6783@gmail.com", href: "mailto:pritomdas6783@gmail.com" },
  { icon: Phone, label: "Phone", value: "+880 1608944818", href: "tel:+8801608944818" },
  { icon: MessageCircle, label: "WhatsApp", value: "+880 1889557719", href: "https://wa.me/8801889557719" },
];

const Contact = () => {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({ name: "", email: "", projectType: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xpwzljwd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", projectType: "", message: "" });
      } else {
        setError("Something went wrong. Please try emailing me directly.");
      }
    } catch {
      setError("Network error. Please try emailing me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  useGSAP(() => {
    gsap.fromTo(".contact-eyebrow", { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-header", start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".contact-headline-word", { yPercent: 110, opacity: 0, rotationZ: 1.5 }, {
      yPercent: 0, opacity: 1, rotationZ: 0, duration: 0.9, stagger: 0.1, ease: "power4.out",
      scrollTrigger: { trigger: ".contact-header", start: "top 82%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".contact-subtext", { y: 25, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-header", start: "top 78%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".contact-divider", { scaleX: 0, transformOrigin: "left center" }, {
      scaleX: 1, duration: 1, ease: "power3.inOut",
      scrollTrigger: { trigger: ".contact-header", start: "top 75%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".contact-card", { clipPath: "inset(0 100% 0 0)", opacity: 0 }, {
      clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.75, stagger: 0.12, ease: "power3.inOut",
      scrollTrigger: { trigger: ".contact-cards", start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(".contact-form-wrap", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-form-wrap", start: "top 85%", toggleActions: "play none none reverse" },
    });

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
  }, { scope: containerRef });

  const inputClass = "w-full border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors duration-200";

  return (
    <section id="contact" ref={containerRef} className="py-16 sm:py-20 md:py-28 pb-20 sm:pb-28 md:pb-36 bg-white text-black overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-14">

        {/* ── HEADER ── */}
        <div className="contact-header mb-10 sm:mb-14 md:mb-20">
          <div className="contact-eyebrow flex items-center gap-3 mb-5">
            <span className="w-4 h-px bg-black/30" aria-hidden="true" />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-black/40">Get In Touch</span>
          </div>
          <div className="space-y-0.5 mb-6 sm:mb-8">
            {["Let's Build a", "Website That", "Grows Your Business."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <h2 className={`contact-headline-word text-[clamp(1.9rem,6vw,6.5rem)] font-black leading-[0.88] tracking-tight uppercase
                  ${i === 1 ? "text-white [-webkit-text-stroke:2px_black]" : "text-black"}`}>
                  {line}
                </h2>
              </div>
            ))}
          </div>
          <p className="contact-subtext text-sm text-black/50 max-w-xl leading-relaxed mb-6 sm:mb-8">
            Whether you need a Wix site, a Squarespace build, or a fully custom-coded website — fill in the form below and I'll get back to you within 24 hours.
          </p>
          <div className="contact-divider w-full h-px bg-black/10" />
        </div>

        {/* ── CONTACT CARDS ── */}
        <div className="contact-cards grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {contactInfo.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.label === "WhatsApp" ? "_blank" : undefined}
              rel={contact.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className="contact-card border border-black/10 p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="card-icon w-10 h-10 sm:w-11 sm:h-11 bg-black/5 flex items-center justify-center text-black">
                  <contact.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <ArrowUpRight className="card-arrow h-4 w-4 text-white opacity-0" aria-hidden="true" />
              </div>
              <div>
                <p className="card-label text-[10px] font-semibold tracking-[0.3em] uppercase text-black/40 mb-1">{contact.label}</p>
                <p className="card-value text-sm font-medium text-black break-words">{contact.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* ── CONTACT FORM + CTA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 sm:gap-8 items-start">

          {/* Form */}
          <div className="contact-form-wrap border border-black/10 p-6 sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircle className="h-10 w-10 text-black" aria-hidden="true" />
                <h3 className="text-xl font-black uppercase tracking-tight">Message Sent!</h3>
                <p className="text-sm text-black/50 max-w-sm leading-relaxed">
                  Thanks for reaching out. I'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-[10px] font-bold tracking-[0.25em] uppercase border border-black/15 px-6 py-2.5 hover:bg-black hover:text-white transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className="mb-6">
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1">Start a Conversation</h3>
                  <p className="text-xs text-black/40">I respond to every message within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-black/40 mb-1.5">
                      Your Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-black/40 mb-1.5">
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-project" className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-black/40 mb-1.5">
                    Project Type
                  </label>
                  <select
                    id="contact-project"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Select a service...</option>
                    <option value="Wix Website">Wix Website</option>
                    <option value="Squarespace Website">Squarespace Website</option>
                    <option value="Custom Coded Website">Custom Coded Website (React / HTML)</option>
                    <option value="Website Redesign">Website Redesign</option>
                    <option value="Other">Other / Not Sure Yet</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label htmlFor="contact-message" className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-black/40 mb-1.5">
                    Tell Me About Your Project <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="What do you need? What's your timeline? Any details help..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs text-red-600 mb-4">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex items-center gap-3 bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-black/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  {submitting ? "Sending..." : "Send Message"}
                  {!submitting && <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto sm:ml-0" aria-hidden="true" />}
                </button>
              </form>
            )}
          </div>

          {/* CTA Block */}
          <div className="border border-black/10 p-6 sm:p-10 flex flex-col gap-5 lg:max-w-xs">
            <div className="flex items-center gap-2 text-black/40">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">Based in Bangladesh</span>
            </div>
            <h3 className="text-[clamp(1.4rem,3vw,2rem)] font-black leading-[0.95] tracking-tight uppercase">
              Ready to Start<br />Your Project?
            </h3>
            <p className="text-sm text-black/50 leading-relaxed">
              Let's build a professional website that grows your business, attracts the right clients, and makes your brand look its best online.
            </p>
            <div className="border-t border-black/10 pt-5 space-y-3">
              <div className="flex items-center gap-3 text-xs text-black/50">
                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                24-hour response time
              </div>
              <div className="flex items-center gap-3 text-xs text-black/50">
                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                Free initial consultation
              </div>
              <div className="flex items-center gap-3 text-xs text-black/50">
                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                Wix, Squarespace & custom builds
              </div>
              <div className="flex items-center gap-3 text-xs text-black/50">
                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                <span className="relative flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  Available now — next slot: Aug 2025
                </span>
              </div>
            </div>
            <a
              href="https://wa.me/8801889557719"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-black/15 hover:border-black text-black font-bold text-xs tracking-[0.2em] uppercase px-6 sm:px-8 py-4 transition-colors hover:bg-black hover:text-white justify-center"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              WhatsApp Me
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
