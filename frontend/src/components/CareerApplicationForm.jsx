import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./CareerApplicationForm.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

const initialFields = {
  full_name: "",
  email: "",
  phone: "",
  message: "",
};

function formatPosition(slug = "") {
  if (!slug) return "General Application";

  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => {
      if (word.toLowerCase() === "python") return "Python";
      if (["api", "ui", "ux", "qa"].includes(word.toLowerCase())) {
        return word.toUpperCase();
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function CareerApplicationForm() {
  const { slug } = useParams();
  const position = formatPosition(slug);

  const [fields, setFields] = useState(initialFields);
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileInputRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFields((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  function handleResumeChange(event) {
    const file = event.target.files?.[0];

    setError("");
    setSuccess("");

    if (!file) {
      setResume(null);
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["pdf", "doc", "docx"];

    if (!allowed.includes(extension)) {
      setResume(null);
      event.target.value = "";
      setError("Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResume(null);
      event.target.value = "";
      setError("Resume must be 5 MB or smaller.");
      return;
    }

    setResume(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = new FormData();

      payload.append("full_name", fields.full_name.trim());
      payload.append("email", fields.email.trim());
      payload.append("phone", fields.phone.trim());
      payload.append("position", position);
      payload.append("resume", resume);
      payload.append("message", fields.message.trim());

      const response = await fetch(
        `${API_BASE_URL}/api/career-applications/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: payload,
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const details = Object.entries(data)
          .map(([field, messages]) => {
            const text = Array.isArray(messages)
              ? messages.join(" ")
              : typeof messages === "string"
                ? messages
                : JSON.stringify(messages);

            return `${field}: ${text}`;
          })
          .join(" | ");

        throw new Error(
          details || "Unable to submit your application. Please try again."
        );
      }

      setSuccess(
        `Application submitted successfully! Reference #${data.id}.`
      );

      setFields(initialFields);
      setResume(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (submissionError) {
      setError(
        submissionError.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="career-application"
      id="career-application-form"
    >
      <div className="career-application-heading">
        <p className="career-application-eyebrow">
          CAREERS / APPLICATION
        </p>

        <h2>Interested in this opportunity?</h2>

        <p>
          Submit your details and resume for the role below.
          Please confirm current vacancies with the company.
        </p>
      </div>

      <form
        className="career-application-form"
        onSubmit={handleSubmit}
      >
        <div className="career-position">
          <span>Applying for</span>
          <strong>{position}</strong>
        </div>

        <div className="career-form-grid">
          <label>
            Full name *
            <input
              type="text"
              name="full_name"
              autoComplete="name"
              value={fields.full_name}
              onChange={handleChange}
              maxLength={150}
              required
            />
          </label>

          <label>
            Email address *
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={fields.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone number *
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={fields.phone}
              onChange={handleChange}
              maxLength={20}
              required
            />
          </label>

          <label>
            Resume * (PDF, DOC, DOCX; max 5 MB)
            <input
              ref={fileInputRef}
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              required
            />
          </label>
        </div>

        <label className="career-message-field">
          Message
          <textarea
            name="message"
            value={fields.message}
            onChange={handleChange}
            rows={4}
            maxLength={2000}
            placeholder="Briefly introduce yourself or share relevant experience."
          />
        </label>

        {error && (
          <p className="career-form-error" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="career-form-success" role="status">
            {success}
          </p>
        )}

        <button
          className="career-submit-btn"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Application ↗"}
        </button>

        <p className="career-privacy-note">
          Your details and resume will be submitted for recruitment
          review. Do not upload unnecessary sensitive information.
        </p>
      </form>
    </section>
  );
}