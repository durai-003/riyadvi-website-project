
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import "./ServiceDetail.css";

const serviceDetails = {
  "web-development": {
    number: "01",
    title: "Web Development",
    subtitle: "Digital experiences engineered for growth.",
    description:
      "We build responsive websites and scalable web applications that help businesses improve customer experiences, streamline operations and grow online.",
    technologies: ["React", "Python", "Django", "REST APIs", "MySQL"],
    benefits: [
      "Responsive and mobile-friendly websites",
      "Scalable backend architecture",
      "Secure API integrations",
      "Performance-focused development",
    ],
  },
  "app-development": {
    number: "02",
    title: "App Development",
    subtitle: "Your ideas, built for every screen.",
    description:
      "We create user-friendly mobile applications designed to connect customers with your products and services.",
    technologies: ["Mobile UI", "API Integration", "Database", "Testing"],
    benefits: [
      "Intuitive user experiences",
      "Reliable API connectivity",
      "Maintainable application architecture",
      "Testing across supported devices",
    ],
  },
  "digital-marketing": {
    number: "03",
    title: "Digital Marketing",
    subtitle: "Turn online visibility into business growth.",
    description:
      "We help businesses reach the right audience through search optimization, content strategy and data-driven digital campaigns.",
    technologies: ["SEO", "Content Strategy", "Analytics", "Campaigns"],
    benefits: [
      "Improved search visibility",
      "Audience-focused campaigns",
      "Performance tracking",
      "Data-informed decisions",
    ],
  },
  "ar-vr": {
    number: "04",
    title: "AR / VR Solutions",
    subtitle: "Make digital experiences feel real.",
    description:
      "We explore immersive experiences that help people interact with products, spaces and digital environments in new ways.",
    technologies: ["3D", "Web Experiences", "Interaction Design", "Prototyping"],
    benefits: [
      "Immersive product experiences",
      "Interactive visual demonstrations",
      "Engaging digital environments",
      "Concept-to-prototype development",
    ],
  },
  "3d-modeling": {
    number: "05",
    title: "3D Modeling",
    subtitle: "Bring ideas into three dimensions.",
    description:
      "We create detailed digital models and visual assets for product presentations, interactive websites and creative projects.",
    technologies: ["3D Modeling", "Texturing", "Lighting", "Rendering"],
    benefits: [
      "Detailed digital assets",
      "Product visualization",
      "Consistent visual presentation",
      "Assets designed for digital use",
    ],
  },
  "ui-ux-design": {
    number: "06",
    title: "UI / UX Design",
    subtitle: "Design that puts people first.",
    description:
      "We design clear, accessible and intuitive digital interfaces by focusing on user needs, usability and visual consistency.",
    technologies: ["User Research", "Wireframes", "Prototyping", "UI Design"],
    benefits: [
      "User-centered interfaces",
      "Clear navigation and layouts",
      "Consistent visual design",
      "Usability-focused prototypes",
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceDetails[slug];

  if (!service) {
    return (
      <main className="service-detail">
        <h1>Service not found</h1>
        <Link to="/services">Back to Services</Link>
      </main>
    );
  }

  return (
    <main className="service-detail">
      <section className="detail-hero">
        <Link to="/services" className="back-link">
          <ArrowLeft size={17} /> All Services
        </Link>

        <p className="detail-eyebrow">
          OUR SERVICES / {service.number}
        </p>

        <h1>{service.title}</h1>
        <h2>{service.subtitle}</h2>
        <p className="detail-description">{service.description}</p>

        <Link to="/contact" className="detail-cta">
          Discuss Your Project <ArrowUpRight size={18} />
        </Link>

        <div className="detail-orb" aria-hidden="true">
          {service.number}
        </div>
      </section>

      <section className="detail-content">
        <div className="detail-heading">
          <p className="detail-eyebrow">WHAT YOU GET</p>
          <h2>Built around your goals.</h2>
        </div>

        <div className="benefit-grid">
          {service.benefits.map((benefit) => (
            <div className="benefit-item" key={benefit}>
              <CheckCircle2 size={21} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="technology-section">
          <p className="detail-eyebrow">TOOLS & TECHNOLOGIES</p>
          <div className="technology-list">
            {service.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-bottom-cta">
        <h2>Have an idea? Let's talk.</h2>
        <p>Tell us what you want to build. Let's explore the next step.</p>
        <Link to="/contact" className="detail-cta">
          Contact Us <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
