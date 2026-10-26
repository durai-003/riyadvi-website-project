import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "motion/react";

import Navbar from "./components/Navbar";
import "./App.css";

const Hero3D = lazy(() => import("./components/Hero3D"));

const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Careers = lazy(() => import("./pages/Careers"));
const CareerDetail = lazy(() => import("./pages/CareerDetail"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
const Contact = lazy(() => import("./pages/Contact"));

const BusinessHealthCheckup = lazy(
  () => import("./pages/BusinessHealthCheckup")
);

const SoftwareProjectPlanningGuide = lazy(
  () => import("./pages/SoftwareProjectPlanningGuide")
);

function Home() {
  return (
    <main className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="hero-eyebrow">
          <span /> INNOVATION · TECHNOLOGY · FUTURE
        </p>

        <h1>
          We Build
          <br />
          <span>Digital Excellence.</span>
        </h1>

        <p className="hero-description">
          Transform your ideas into powerful digital experiences
          with innovative software, intelligent technology, and
          design that moves businesses forward.
        </p>

        <div className="hero-actions">
          <motion.a
            href="/contact"
            className="primary-btn"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Project <span>↗</span>
          </motion.a>

          <motion.a
            href="/portfolio"
            className="secondary-btn"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Our Work <span>→</span>
          </motion.a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>01</strong>
            <span>Creative Thinking</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Smart Technology</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Real Impact</span>
          </div>
        </div>
      </motion.div>

      <Hero3D />
    </main>
  );
}

function Placeholder({ title }) {
  return (
    <main className="placeholder-page">
      <p>RIYADVI TECHNOLOGIES</p>
      <h1>{title}</h1>
      <span>Something innovative is taking shape.</span>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Suspense
        fallback={
          <div className="page-loading" role="status">
            Loading page...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/services" element={<Services />} />
          <Route
            path="/services/:slug"
            element={<ServiceDetail />}
          />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/portfolio/:slug"
            element={<PortfolioDetail />}
          />

          <Route path="/about" element={<About />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          <Route path="/careers" element={<Careers />} />
          <Route
            path="/careers/:slug"
            element={<CareerDetail />}
          />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/business-health-checkup"
            element={<BusinessHealthCheckup />}
          />

          <Route
            path="/software-project-planning-guide"
            element={<SoftwareProjectPlanningGuide />}
          />

          <Route
            path="*"
            element={<Placeholder title="Page Not Found" />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;