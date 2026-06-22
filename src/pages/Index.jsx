import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Process from "../components/Process";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => (
  <div className="min-h-screen text-foreground">
    <Navbar />
    <Hero />
    <main id="main-content">
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Process />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
