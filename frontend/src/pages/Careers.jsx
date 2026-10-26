
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, BriefcaseBusiness } from "lucide-react";
import "./Careers.css";

export const jobs = [
  {
    slug: "python-developer",
    title: "Python Developer",
    department: "Engineering",
    location: "Confirm with company",
    type: "Entry Level",
    description:
      "Contribute to backend features, API development, testing and database integration while learning from experienced developers.",
    responsibilities: [
      "Write readable and maintainable Python code.",
      "Help build and test REST API endpoints.",
      "Work with SQL databases and data models.",
      "Debug issues and collaborate through Git.",
    ],
    skills: ["Python", "OOP", "SQL", "REST APIs", "Git"],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    department: "Product Engineering",
    location: "Confirm with company",
    type: "Entry Level",
    description:
      "Help create responsive interfaces and accessible user experiences for web applications.",
    responsibilities: [
      "Build reusable UI components.",
      "Create responsive layouts.",
      "Connect interfaces to backend APIs.",
      "Test and improve usability.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Confirm with company",
    type: "Entry Level",
    description:
      "Work across frontend interfaces and backend services to develop complete web application features.",
    responsibilities: [
      "Develop frontend pages and components.",
      "Create backend endpoints.",
      "Integrate database operations.",
      "Test features and fix defects.",
    ],
    skills: ["JavaScript", "React", "Python", "SQL", "APIs"],
  },
];

export default function Careers() {
  return (
    <main className="careers-page">
      <section className="careers-hero">
        <p className="careers-eyebrow">CAREERS / GROW WITH US</p>
        <h1>
          Build your future.
          <br />
          <span>Make an impact.</span>
        </h1>
        <p>
          Explore opportunities to learn, collaborate and contribute
          to meaningful digital experiences.
        </p>
        <a href="#open-positions" className="careers-hero-link">
          Explore Opportunities <ArrowUpRight size={18} />
        </a>
      </section>

      <section className="careers-intro">
        <div>
          <p className="careers-eyebrow">WHY JOIN US?</p>
          <h2>Curiosity. Collaboration. Growth.</h2>
        </div>
        <p>
          Great products are built by people who keep learning.
          We value thoughtful problem-solving, clear communication
          and a willingness to improve through feedback.
        </p>
      </section>

      <section className="careers-listing" id="open-positions">
        <p className="careers-eyebrow">OPPORTUNITIES</p>
        <h2>Explore roles.</h2>
        <p className="careers-notice">
          These are sample role descriptions for the website prototype,
          not verified current vacancies.
        </p>

        <div className="job-list">
          {jobs.map((job) => (
            <article className="job-card" key={job.slug}>
              <div className="job-main">
                <p className="job-department">{job.department}</p>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <div className="job-meta">
                  <span>
                    <MapPin size={15} /> {job.location}
                  </span>
                  <span>
                    <BriefcaseBusiness size={15} /> {job.type}
                  </span>
                </div>
              </div>

              <Link
                to={`/careers/${job.slug}`}
                className="job-link"
              >
                View Role <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="careers-cta">
        <p className="careers-eyebrow">LET'S CONNECT</p>
        <h2>Don't see a suitable role?</h2>
        <p>Contact the team to ask about future opportunities.</p>
        <Link to="/contact" className="careers-hero-link">
          Contact Us <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
