
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./Portfolio.css";

const projects = [
  {
    id: "01",
    title: "GlowBook",
    category: "Web Application",
    description:
      "A salon booking platform for discovering services, choosing staff and managing appointments.",
    tags: ["React", "Django", "MySQL"],
    slug: "glowbook",
    visual: "glowbook",
  },
  {
    id: "02",
    title: "PriceWise",
    category: "E-commerce Platform",
    description:
      "A product comparison experience that helps shoppers compare products across online stores.",
    tags: ["React", "REST API", "Python"],
    slug: "pricewise",
    visual: "pricewise",
  },
  {
    id: "03",
    title: "Compliance Hub",
    category: "Business Software",
    description:
      "A centralized concept for tracking audits, findings, corrective actions and documents.",
    tags: ["React", "Django", "SQL"],
    slug: "compliance-hub",
    visual: "compliance",
  },
];

export default function Portfolio() {
  return (
    <main className="portfolio-page">
      <section className="portfolio-hero">
        <p className="portfolio-eyebrow">OUR WORK / SELECTED PROJECTS</p>
        <h1>
          Ideas into
          <br />
          <span>digital impact.</span>
        </h1>
        <p>
          Explore selected project concepts showcasing our approach to
          thoughtful design, useful technology and real-world problems.
        </p>
      </section>

      <section className="portfolio-grid-section">
        <div className="portfolio-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.slug}>
              <div className={`project-visual ${project.visual}`}>
                <span className="project-index">{project.id}</span>
                <div className="project-visual-content">
                  <span>RIYADVI / PROJECT</span>
                  <h2>{project.title}</h2>
                  <div className="project-visual-line" />
                </div>
                <span className="project-category">{project.category}</span>
              </div>

              <div className="project-info">
                <p>{project.category}</p>
                <h2>{project.title}</h2>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <Link
                  to={`/portfolio/${project.slug}`}
                  className="project-link"
                >
                  View Case Study <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-cta">
        <p className="portfolio-eyebrow">YOUR PROJECT COULD BE NEXT</p>
        <h2>Let's create something remarkable.</h2>
        <Link to="/contact" className="portfolio-cta-link">
          Start a Conversation <ArrowUpRight size={17} />
        </Link>
      </section>
    </main>
  );
}
