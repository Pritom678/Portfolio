import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App.jsx";
import "./index.css";

// Register GSAP plugins once globally
gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")).render(<App />);
