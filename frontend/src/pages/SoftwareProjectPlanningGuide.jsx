
import { useState } from "react";
import "./SoftwareProjectPlanningGuide.css";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const API_URL = `${API_BASE_URL}/api/planning-guide/`;

const phases = [
  {
    number: "01",
    title: "Discover the problem",
    duration: "Week 1",
    description:
      "Understand the business objective, target users, existing workflow, and the problem the software must solve.",
    tasks: [
      "Define the business problem",
      "Identify stakeholders and users",
      "Document project goals",
    ],
  },
  {
    number: "02",
    title: "Define requirements",
    duration: "Week 1–2",
    description:
      "Convert ideas into clear functional requirements, non-functional requirements, and acceptance criteria.",
    tasks: [
      "List core features",
      "Define security and performance needs",
      "Agree on acceptance criteria",
    ],
  },
  {
    number: "03",
    title: "Design the solution",
    duration: "Week 2–3",
    description:
      "Plan the user experience, application architecture, database, APIs, and technology stack.",
    tasks: [
      "Prepare wireframes",
      "Design database entities",
      "Document API contracts",
    ],
  },
  {
    number: "04",
    title: "Build in iterations",
    duration: "Depends on scope",
    description:
      "Break implementation into manageable tasks, use version control, and review progress regularly.",
    tasks: [
      "Create a prioritized backlog",
      "Set up the development environment",
      "Review and test each iteration",
    ],
  },
  {
    number: "05",
    title: "Test and launch",
    duration: "Before release",
    description:
      "Validate requirements, test critical workflows, prepare deployment, and plan ongoing maintenance.",
    tasks: [
      "Test important user journeys",
      "Review access and backups",
      "Prepare deployment and rollback plans",
    ],
  },
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
};

export default function SoftwareProjectPlanningGuide() {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState("01");

  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const totalTasks = phases.reduce(
    (total, phase) => total + phase.tasks.length,
    0
  );

  const progress = Math.round((completed.length / totalTasks) * 100);

  function toggleTask(task) {
    setCompleted((previous) =>
      previous.includes(task)
        ? previous.filter((item) => item !== task)
        : [...previous, task]
    );
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const details = Object.entries(data)
          .map(([field, messages]) => {
            const message = Array.isArray(messages)
              ? messages.join(" ")
              : typeof messages === "string"
                ? messages
                : JSON.stringify(messages);

            return `${field}: ${message}`;
          })
          .join(" ");

        throw new Error(
          details || "Unable to submit your details. Please try again."
        );
      }

      setSuccess(
        `Thank you! Your details have been submitted successfully. Reference #${data.id}.`
      );
      setFormData(initialForm);
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the server. Please check that the backend is running."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="planning-page">
      <section className="planning-hero">
        <p className="planning-eyebrow">
          RIYADVI TECHNOLOGIES / PROJECT GUIDE
        </p>

        <h1>
          From idea to impact.
          <br />
          <span>Plan with purpose.</span>
        </h1>

        <p>
          A practical roadmap for turning a software idea into a clear,
          testable, and maintainable digital product.
        </p>

        <a className="planning-cta" href="#planning-lead-form">
          Discuss Your Project ↗
        </a>
      </section>

      <section className="planning-intro">
        <div>
          <p className="planning-eyebrow">THE ROADMAP</p>
          <h2>
            Five phases.
            <br />
            One clear direction.
          </h2>
        </div>

        <p>
          Project timelines depend on scope, team size, dependencies, and
          feedback. Treat these phases as a planning framework rather than
          a fixed delivery promise.
        </p>
      </section>

      <section className="planning-download">
          <div className="planning-download-copy">
            <p className="planning-eyebrow">FREE PROJECT RESOURCE</p>
            <h2>Take your project plan with you.</h2>
            <p>
              Download our practical guide with project phases,
              planning checklists, a kickoff worksheet, and launch-readiness steps.
            </p>
          </div>

  <a
    className="planning-cta planning-download-button"
    href="/software_project_planning_guide.pdf"
    download="Riyadvi-Software-Project-Planning-Guide.pdf"
  >
    ↓ Download Planning Guide (PDF)
  </a>
</section>


      <section className="planning-progress">
        <div>
          <span>YOUR PLANNING CHECKLIST</span>
          <strong>
            {completed.length} / {totalTasks} tasks
          </strong>
        </div>

        <div
          className="planning-progress-track"
          role="progressbar"
          aria-label="Planning checklist progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div style={{ width: `${progress}%` }} />
        </div>

        <p>{progress}% completed</p>
      </section>

      <section className="planning-phases">
        {phases.map((phase) => (
          <article className="planning-phase" key={phase.number}>
            <button
              type="button"
              className="planning-phase-heading"
              onClick={() =>
                setExpanded((current) =>
                  current === phase.number ? "" : phase.number
                )
              }
              aria-expanded={expanded === phase.number}
            >
              <span className="planning-number">{phase.number}</span>

              <span className="planning-phase-title">
                <strong>{phase.title}</strong>
                <small>{phase.duration}</small>
              </span>

              <span className="planning-toggle">
                {expanded === phase.number ? "−" : "+"}
              </span>
            </button>

            {expanded === phase.number && (
              <div className="planning-phase-content">
                <p>{phase.description}</p>

                {phase.tasks.map((task) => (
                  <label className="planning-task" key={task}>
                    <input
                      type="checkbox"
                      checked={completed.includes(task)}
                      onChange={() => toggleTask(task)}
                    />
                    <span>{task}</span>
                  </label>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>

      <section
        className="planning-bottom"
        id="planning-lead-form"
      >
        <p className="planning-eyebrow">READY TO PLAN?</p>

        <h2>Start with the right questions.</h2>

        <p>
          Share your contact details and discuss your software project
          goals with our team.
        </p>

        <form
          className="planning-lead-form"
          onSubmit={handleSubmit}
        >
          <div className="planning-lead-field">
            <label htmlFor="planning-name">Full name *</label>
            <input
              id="planning-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={100}
              autoComplete="name"
              required
            />
          </div>

          <div className="planning-lead-field">
            <label htmlFor="planning-company">Company *</label>
            <input
              id="planning-company"
              name="company"
              type="text"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={handleInputChange}
              maxLength={150}
              autoComplete="organization"
              required
            />
          </div>

          <div className="planning-lead-field">
            <label htmlFor="planning-email">Email address *</label>
            <input
              id="planning-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="planning-lead-field">
            <label htmlFor="planning-phone">Phone number *</label>
            <input
              id="planning-phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength={20}
              autoComplete="tel"
              required
            />
          </div>

          {error && (
            <p className="planning-lead-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="planning-lead-success" role="status">
              {success}
            </p>
          )}

          <button
            className="planning-cta planning-lead-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Project Enquiry ↗"}
          </button>

          <p className="planning-lead-note">
            Your details will be submitted to Riyadvi Technologies for
            project enquiries.
          </p>
        </form>
      </section>
    </main>
  );
}
