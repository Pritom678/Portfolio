import { Mail, Phone, MessageCircle, Send, MapPin } from "lucide-react";
import { Button } from "../ui/button";
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
  const headerRef = useRef(null);
  const contactCardsRef = useRef(null);
  const ctaRef = useRef(null);

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
        )
        .from(
          headerRef.current.children[2],
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Contact cards animation
      gsap.fromTo(
        contactCardsRef.current.children,
        {
          y: 80,
          opacity: 0,
          scale: 0.8,
          rotationX: 45,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: contactCardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA section animation
      gsap.fromTo(
        ctaRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for contact cards
      const contactCards = contactCardsRef.current.children;
      Array.from(contactCards).forEach((card) => {
        const icon = card.querySelector(".contact-icon");

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

      // Floating animation for contact cards - synchronized
      Array.from(contactCards).forEach((card) => {
        gsap.to(card, {
          y: "+=6",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 0, // Same delay for all cards to keep them aligned
        });
      });

      // CTA button hover animation
      const ctaButton = ctaRef.current.querySelector("a");
      if (ctaButton) {
        ctaButton.addEventListener("mouseenter", () => {
          gsap.to(ctaButton, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        ctaButton.addEventListener("mouseleave", () => {
          gsap.to(ctaButton, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section id="contact" className="py-32 pb-40 relative" ref={containerRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.05)_0%,transparent_60%)]" />

      <div className="w-full max-w-[95vw] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20" ref={headerRef}>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mt-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-6 max-w-4xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8" ref={contactCardsRef}>
            {contactInfo.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.label === "WhatsApp" ? "_blank" : undefined}
                rel={
                  contact.label === "WhatsApp"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="glass-card p-8 rounded-xl text-center hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="contact-icon w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <contact.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg group-hover:text-primary transition-colors duration-300">
                  {contact.label}
                </h3>
                <p className="text-muted-foreground">{contact.value}</p>
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-40  text-center" ref={ctaRef}>
            <div className="glass-card inline-block p-12 rounded-2xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground text-lg">
                  Based in Bangladesh
                </span>
              </div>
              <h3 className="text-2xl xl:text-3xl font-bold mb-6">
                Ready to start a project?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Feel free to reach out if you're looking for a developer, have a
                question, or just want to connect.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-primary px-8 py-4 text-lg"
              >
                <a href="mailto:pritomdas6783@gmail.com">
                  <Send className="h-6 w-6 mr-2" />
                  Send me an email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
