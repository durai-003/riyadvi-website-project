import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import "./Contact.css";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("Sending your enquiry...");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "object"
            ? Object.values(data).flat().join(" ")
            : "Unable to submit your enquiry."
        );
      }

      setStatus(
        `Enquiry submitted successfully! Reference ID: ${data.id}`
      );

      setForm({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact API error:", error);

      setStatus(
        `Submission failed: ${error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="eyebrow">
          LET'S BUILD SOMETHING GREAT
        </p>

        <h1>
          Have a project in <span>mind?</span>
        </h1>

        <p>
          Tell us about your idea. Let's explore how technology
          can help your business grow.
        </p>
      </section>

      <section className="contact-layout">
        <div className="contact-info">
          <p className="eyebrow">GET IN TOUCH</p>

          <h2>Let's start a conversation.</h2>

          <p>
            Share your requirements and our team can discuss
            the next steps with you.
          </p>

          <div className="contact-note">
            <span>01</span>
            <p>
              Tell us your idea. We'll explore the possibilities.
            </p>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <p className="eyebrow">PROJECT ENQUIRY</p>

          <h2>Send us a message</h2>

          <div className="contact-fields">
            <label>
              Full name *
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                minLength={2}
              />
            </label>

            <label>
              Email address *
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Company
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name (optional)"
              />
            </label>

            <label>
              Service interested in *
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                <option value="Web Development">
                  Web Development
                </option>
                <option value="App Development">
                  App Development
                </option>
                <option value="Digital Marketing">
                  Digital Marketing
                </option>
                <option value="AR/VR">
                  AR/VR Solutions
                </option>
                <option value="3D Modeling">
                  3D Modeling
                </option>
                <option value="UI/UX Design">
                  UI/UX Design
                </option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="full-width">
              Project details *
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={5}
                required
                minLength={10}
              />
            </label>
          </div>

          <button
            type="submit"
            className="contact-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Enquiry"}

            <Send size={17} />
          </button>

          {status && (
            <p className="contact-status" role="status">
              <CheckCircle size={18} />
              {status}
            </p>
          )}

          <p className="form-privacy">
            Please don't include passwords or sensitive
            personal information.
          </p>
        </form>
      </section>
    </main>
  );
}