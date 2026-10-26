
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Lightbulb,
  ShieldCheck,
  Users,
  ArrowUpRight,
} from "lucide-react";
import "./About.css";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We explore thoughtful ideas and practical technologies to solve business problems.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "We focus on maintainable code, reliable experiences and continuous improvement.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe clear communication and teamwork lead to better digital products.",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, users and project requirements.",
  },
  {
    number: "02",
    title: "Design",
    description: "Plan the user experience, architecture and visual direction.",
  },
  {
    number: "03",
    title: "Develop",
    description: "Build and test the solution with a focus on quality.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Deploy, review and improve the product based on feedback.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="about-eyebrow">ABOUT RIYADVI</p>
        <h1>
          We turn ambitious ideas into
          <span> meaningful digital experiences.</span>
        </h1>
        <p className="about-intro">
          We focus on bringing design, technology and business thinking
          together to create useful digital solutions.
        </p>
        <Link to="/contact" className="about-button">
          Work With Us <ArrowUpRight size={18} />
        </Link>
        <div className="about-decoration" aria-hidden="true">
          R.
        </div>
      </section>

      <section className="about-story">
        <div>
          <p className="about-eyebrow">OUR APPROACH</p>
          <h2>Technology should solve real problems.</h2>
        </div>
        <p>
          Every project starts with understanding the problem. We then
          explore the right solution, build with purpose and refine the
          experience through testing and feedback. Our goal is to create
          digital products that are useful, accessible and ready to grow.
        </p>
      </section>

      <section className="about-purpose">
        <article className="purpose-card">
          <Target size={30} />
          <p className="about-eyebrow">OUR MISSION</p>
          <h2>Make technology useful.</h2>
          <p>
            Help businesses solve problems through practical software,
            thoughtful design and reliable digital experiences.
          </p>
        </article>

        <article className="purpose-card">
          <Eye size={30} />
          <p className="about-eyebrow">OUR VISION</p>
          <h2>Build for what comes next.</h2>
          <p>
            Create adaptable digital solutions that help businesses
            respond to changing customer needs and opportunities.
          </p>
        </article>
      </section>

      <section className="about-values">
        <p className="about-eyebrow">WHAT GUIDES US</p>
        <h2>Our core values.</h2>

        <div className="values-grid">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article className="value-card" key={value.title}>
                <Icon size={28} />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-process">
        <p className="about-eyebrow">HOW WE WORK</p>
        <h2>From first idea to launch.</h2>

        <div className="process-grid">
          {process.map((step) => (
            <article className="process-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2>Have a challenge worth solving?</h2>
        <p>Let's discuss your next digital project.</p>
        <Link to="/contact" className="about-button">
          Get in Touch <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
