
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import "./PortfolioDetail.css";

const caseStudies = {
  glowbook: {
    title: "GlowBook",
    category: "Salon Booking Platform",
    summary:
      "A salon booking platform concept designed to help customers discover services, choose staff and manage appointments.",
    challenge:
      "Customers need a simple way to explore salon services, find suitable staff and organise their appointments.",
    solution:
      "A web application concept that brings salon services, staff selection and appointment management into one experience.",
    technologies: ["React", "Django", "MySQL", "REST API"],
    features: [
      "Browse salon services",
      "Choose preferred staff",
      "Manage appointments",
      "Store application data in MySQL",
    ],
  },
  pricewise: {
    title: "PriceWise",
    category: "E-commerce Comparison Platform",
    summary:
      "A product comparison platform concept that helps shoppers compare product information across online stores.",
    challenge:
      "Comparing products across multiple shopping websites can take time and make purchase decisions difficult.",
    solution:
      "A central comparison experience designed to organise product information and make shopping research easier.",
    technologies: ["React", "Python", "REST API"],
    features: [
      "Display product information",
      "Compare available product options",
      "Organise shopping research",
      "Build a clear user experience",
    ],
  },
  "compliance-hub": {
    title: "Compliance Hub",
    category: "Business Compliance Software",
    summary:
      "A centralised software concept for organising audits, findings, corrective actions and compliance documents.",
    challenge:
      "Business teams need a structured way to track audit activities, findings and follow-up actions.",
    solution:
      "A central workspace concept that groups compliance activities and supporting documents in one place.",
    technologies: ["React", "Django", "SQL"],
    features: [
      "Track audit activities",
      "Record findings",
      "Manage corrective actions",
      "Organise compliance documents",
    ],
  },
};

export default function PortfolioDetail() {
  const { slug } = useParams();
  const project = caseStudies[slug];

  if (!project) {
    return (
      <main className="portfolio-detail">
        <section className="portfolio-detail-hero">
          <p className="portfolio-detail-eyebrow">RIYADVI / PORTFOLIO</p>
          <h1>Project not found.</h1>
          <Link className="portfolio-detail-back" to="/portfolio">
            <ArrowLeft size={17} /> Back to Portfolio
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="portfolio-detail">
      <section className="portfolio-detail-hero">
        <Link className="portfolio-detail-back" to="/portfolio">
          <ArrowLeft size={17} /> Back to Portfolio
        </Link>

        <p className="portfolio-detail-eyebrow">
          SELECTED WORK / {project.category.toUpperCase()}
        </p>

        <h1>
          {project.title}
          <span>.</span>
        </h1>

        <p className="portfolio-detail-summary">{project.summary}</p>

        <div className="portfolio-detail-tags">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </section>

      <section className="portfolio-detail-content">
        <article className="portfolio-detail-panel">
          <p className="portfolio-detail-eyebrow">01 / THE CHALLENGE</p>
          <h2>The problem to solve.</h2>
          <p>{project.challenge}</p>
        </article>

        <article className="portfolio-detail-panel">
          <p className="portfolio-detail-eyebrow">02 / THE SOLUTION</p>
          <h2>A thoughtful approach.</h2>
          <p>{project.solution}</p>
        </article>

        <article className="portfolio-detail-panel portfolio-detail-features">
          <p className="portfolio-detail-eyebrow">03 / KEY FEATURES</p>
          <h2>Designed around practical needs.</h2>

          <ul>
            {project.features.map((feature) => (
              <li key={feature}>
                <CheckCircle2 size={18} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="portfolio-detail-cta">
        <p className="portfolio-detail-eyebrow">HAVE A SIMILAR IDEA?</p>
        <h2>Let's plan your next project.</h2>
        <Link to="/contact" className="portfolio-detail-contact">
          Start a Conversation <ArrowUpRight size={17} />
        </Link>
      </section>
    </main>
  );
}
