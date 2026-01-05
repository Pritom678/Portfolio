import { Mail, Phone, MessageCircle, Send, MapPin } from "lucide-react";
import { Button } from "../ui/button";

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
  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,217,255,0.05)_0%,_transparent_60%)]" />

      <div className="w-full max-w-[95vw] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mt-4 animate-slide-up animate-delay-200">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-6 max-w-4xl mx-auto animate-fade-in animate-delay-300">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.label === "WhatsApp" ? "_blank" : undefined}
                rel={
                  contact.label === "WhatsApp"
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`glass-card p-8 rounded-xl text-center hover:border-primary/50 transition-all duration-300 group hover-lift animate-scale-in animate-delay-${
                  400 + index * 100
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 hover-glow">
                  <contact.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg group-hover:text-primary transition-colors duration-300">
                  {contact.label}
                </h3>
                <p className="text-muted-foreground">{contact.value}</p>
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center animate-fade-in animate-delay-700">
            <div className="glass-card inline-block p-12 rounded-2xl hover-lift">
              <div className="flex items-center justify-center gap-3 mb-6 animate-bounce-in animate-delay-800">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground text-lg">
                  Based in Bangladesh
                </span>
              </div>
              <h3 className="text-2xl xl:text-3xl font-bold mb-6 animate-slide-up animate-delay-900">
                Ready to start a project?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg animate-fade-in animate-delay-1000">
                Feel free to reach out if you're looking for a developer, have a
                question, or just want to connect.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-primary hover-lift animate-bounce-in animate-delay-1100 px-8 py-4 text-lg"
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
