
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { jobs } from "./Careers";
import "./CareerDetail.css";
import CareerApplicationForm from "../components/CareerApplicationForm";

export default function CareerDetail() {
  const { slug } = useParams();
  const job = jobs.find((item) => item.slug === slug);

  if (!job) {
    return (
      <main className="career-detail">
        <h1>Role not found</h1>
        <Link to="/careers">Back to Careers</Link>
      </main>
    );
  }

  return (
    <main className="career-detail">
      <section className="career-detail-hero">
        <Link to="/careers" className="career-back">
          <ArrowLeft size={17} /> All Opportunities
        </Link>

        <p className="career-eyebrow">{job.department}</p>
        <h1>{job.title}</h1>
        <p className="career-description">{job.description}</p>

        <div className="career-details-meta">
          <span>{job.location}</span>
          <span>{job.type}</span>
        </div>

        <p className="career-sample-note">
          Sample job description for the website prototype. Confirm
          actual vacancies, eligibility and application instructions
          with the company before publishing.
        </p>

        <a
          href="#career-application-form"
          className="career-apply-button"
        >
          Apply for This Role <ArrowUpRight size={18} />
        </a>
      </section>

      <section className="career-detail-content">
        <div>
          <p className="career-eyebrow">RESPONSIBILITIES</p>
          <h2>What you may work on.</h2>

          <div className="career-responsibilities">
            {job.responsibilities.map((responsibility) => (
              <div key={responsibility}>
                <CheckCircle2 size={20} />
                <p>{responsibility}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="career-skills">
          <p className="career-eyebrow">SKILLS</p>
          <h2>Relevant knowledge.</h2>
          <div className="career-skill-list">
            {job.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className="career-detail-bottom">
        <h2>Interested in this opportunity?</h2>
        <p>Contact the company to confirm current openings and how to apply.</p>
        <Link to="/contact" className="career-apply-button">
          Contact Us <ArrowUpRight size={18} />
        </Link>
      </section>
      <CareerApplicationForm />
    </main>
  );
}
