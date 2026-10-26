
import { Link } from "react-router-dom";
import {
  Code2,
  Smartphone,
  TrendingUp,
  Glasses,
  Box,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "High-performance websites and scalable web applications built around your business goals.",
    icon: Code2,
    slug: "web-development",
    tags: ["React", "Django", "APIs"],
  },
  {
    number: "02",
    title: "App Development",
    description:
      "Intuitive mobile experiences that connect your customers with your business anywhere.",
    icon: Smartphone,
    slug: "app-development",
    tags: ["Mobile", "iOS", "Android"],
  },
  {
    number: "03",
    title: "Digital Marketing",
    description:
      "Data-driven digital strategies that grow visibility, engagement and qualified leads.",
    icon: TrendingUp,
    slug: "digital-marketing",
    tags: ["SEO", "Growth", "Analytics"],
  },
  {
    number: "04",
    title: "AR / VR Solutions",
    description:
      "Immersive digital experiences that bring products, spaces and ideas to life.",
    icon: Glasses,
    slug: "ar-vr",
    tags: ["AR", "VR", "Immersive"],
  },
  {
    number: "05",
    title: "3D Modeling",
    description:
      "Detailed 3D assets and visual experiences for products, brands and digital worlds.",
    icon: Box,
    slug: "3d-modeling",
    tags: ["3D", "Visualization", "Design"],
  },
  {
    number: "06",
    title: "UI / UX Design",
    description:
      "User-focused interfaces that make digital products clear, accessible and enjoyable.",
    icon: Palette,
    slug: "ui-ux-design",
    tags: ["Research", "UI", "Prototyping"],
  },
];

export default function Services() {
  return (
    <main className="services-page">
      <section className="services-hero">
        <p className="services-eyebrow">WHAT WE DO</p>
        <h1>
          Technology with
          <br />
          <span>Purpose & Precision.</span>
        </h1>
        <p className="services-intro">
          From bold ideas to powerful digital products, we bring
          strategy, engineering and creativity together to help
          your business move forward.
        </p>
        <div className="services-count">
          <span>06</span> CORE SERVICES
        </div>
      </section>

      <section className="services-grid-section">
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.slug}>
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <Icon className="service-icon" size={29} strokeWidth={1.5} />
                </div>

                <h2>{service.title}</h2>
                <p>{service.description}</p>

                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <Link
                  className="service-link"
                  to={`/services/${service.slug}`}
                  aria-label={`Explore ${service.title}`}
                >
                  Explore Service <ArrowUpRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="services-cta">
        <p>HAVE A PROJECT IN MIND?</p>
        <h2>Let's build something meaningful.</h2>
        <Link to="/contact" className="services-cta-button">
          Discuss Your Project <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
