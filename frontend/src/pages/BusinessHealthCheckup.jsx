
import { useState } from "react";
import "./BusinessHealthCheckup.css";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const API_URL = `${API_BASE_URL}/api/business-health-checkup/`;

const questions = [
  {
    title: "Does your business have a professional website?",
    options: [
      "Yes, modern and responsive",
      "Yes, but needs improvement",
      "No website yet",
    ],
  },
  {
    title: "How do you manage business operations?",
    options: [
      "Mostly automated",
      "Partially automated",
      "Mostly manual",
    ],
  },
  {
    title: "How do you manage customer information?",
    options: [
      "Secure, organized system",
      "Spreadsheets or separate tools",
      "No consistent system",
    ],
  },
  {
    title: "How do customers contact your business?",
    options: [
      "Website and multiple digital channels",
      "Mostly phone or messaging",
      "Limited communication channels",
    ],
  },
  {
    title: "How do you track business performance?",
    options: [
      "Dashboards and regular reports",
      "Occasional manual reports",
      "We rarely measure performance",
    ],
  },
];

const recommendations = [
  "Strengthen your digital presence with a responsive website and clear customer journeys.",
  "Explore workflow automation to reduce repetitive tasks and improve efficiency.",
  "Organize customer data and review access controls, backups, and security practices.",
  "Create a consistent digital communication and enquiry management process.",
  "Introduce measurable goals and regular performance reporting.",
];

const steps = [
  "Business Information",
  "Digital Presence",
  "Marketing",
  "Technology",
  "Business Challenges",
  "Submission",
];

const initialBusiness = {
  business_name: "",
  contact_name: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
};

export default function BusinessHealthCheckup() {
  const [business, setBusiness] = useState(initialBusiness);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedSubmission, setSavedSubmission] = useState(null);

  const score = questions.reduce((total, question, index) => {
    const answer = answers[index];
    return total + (answer === undefined ? 0 : 2 - answer);
  }, 0);

  const resultLabel =
    score >= 8
      ? "Strong digital foundations"
      : score >= 5
        ? "Room to improve"
        : "Opportunity for digital transformation";

  const progress = ((currentStep + 1) / steps.length) * 100;

  function updateBusiness(event) {
    const { name, value } = event.target;
    setBusiness((previous) => ({ ...previous, [name]: value }));
  }

  function selectAnswer(questionIndex, optionIndex) {
    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
  }

  function validateCurrentStep() {
    if (currentStep === 0) {
      return (
        business.business_name.trim() &&
        business.contact_name.trim() &&
        business.email.trim() &&
        business.phone.trim()
      );
    }

    if (currentStep === 1) return answers[0] !== undefined;
    if (currentStep === 2) return answers[3] !== undefined;
    if (currentStep === 3) {
      return answers[1] !== undefined && answers[2] !== undefined;
    }
    if (currentStep === 4) return answers[4] !== undefined;

    return true;
  }

  function goNext(event) {
    event.preventDefault();
    setError("");

    if (!validateCurrentStep()) {
      setError("Please complete all required fields in this step.");
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  function goBack() {
    setError("");
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  async function submitAssessment(event) {
    event.preventDefault();
    setError("");

    if (!validateCurrentStep()) {
      setError("Please complete the required information.");
      return;
    }

    if (Object.keys(answers).length !== questions.length) {
      setError("Please answer all five assessment questions.");
      return;
    }

    setLoading(true);

    const payload = {
      ...business,
      digital_presence: {
        website_status: questions[0].options[answers[0]],
        website_answer: answers[0],
      },
      marketing: {
        customer_contact_channels: questions[3].options[answers[3]],
        customer_contact_answer: answers[3],
      },
      technology: {
        operations_management: questions[1].options[answers[1]],
        operations_answer: answers[1],
        customer_information_management: questions[2].options[answers[2]],
        customer_information_answer: answers[2],
      },
      business_challenges: {
        performance_tracking: questions[4].options[answers[4]],
        performance_tracking_answer: answers[4],
      },
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        const details = Object.entries(responseData)
          .map(([field, message]) => {
            const readableMessage = Array.isArray(message)
              ? message.join(", ")
              : typeof message === "object"
                ? JSON.stringify(message)
                : message;

            return `${field}: ${readableMessage}`;
          })
          .join(" | ");

        throw new Error(
          details || `Submission failed with status ${response.status}.`
        );
      }

      setSavedSubmission(responseData);
      setShowResults(true);
    } catch (submissionError) {
      setError(
        submissionError.message ||
          "Unable to submit your assessment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetAssessment() {
    setBusiness(initialBusiness);
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setLoading(false);
    setError("");
    setSavedSubmission(null);
  }

  function renderQuestion(questionIndex) {
    const question = questions[questionIndex];

    return (
      <fieldset className="health-question" key={question.title}>
        <legend>
          <span>0{questionIndex + 1}</span> {question.title}
        </legend>

        {question.options.map((option, optionIndex) => (
          <label className="health-option" key={option}>
            <input
              type="radio"
              name={`question-${questionIndex}`}
              checked={answers[questionIndex] === optionIndex}
              onChange={() => selectAnswer(questionIndex, optionIndex)}
            />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>
    );
  }

  return (
    <main className="health-page">
      <section className="health-hero">
        <p className="health-eyebrow">
          RIYADVI TECHNOLOGIES / BUSINESS INSIGHTS
        </p>

        <h1>
          Understand your business.
          <br />
          <span>Unlock its potential.</span>
        </h1>

        <p>
          Review your digital readiness, identify improvement opportunities,
          and discover practical next steps for your business.
        </p>

        {!showResults && (
          <div className="health-progress">
            <span>
              STEP {currentStep + 1} OF {steps.length} — {steps[currentStep]}
            </span>
            <span>{Math.round(progress)}%</span>
            <div className="health-progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </section>

      {!showResults ? (
        <form
          className="health-form"
          onSubmit={
            currentStep === steps.length - 1
              ? submitAssessment
              : goNext
          }
        >
          {currentStep === 0 && (
            <section className="health-step">
              <h2>Tell us about your business</h2>
              <p className="health-step-description">
                Fields marked * are required.
              </p>

              <div className="health-fields">
                <label className="health-field">
                  Business name *
                  <input
                    name="business_name"
                    value={business.business_name}
                    onChange={updateBusiness}
                    required
                    maxLength={150}
                    placeholder="Your company name"
                  />
                </label>

                <label className="health-field">
                  Contact name *
                  <input
                    name="contact_name"
                    value={business.contact_name}
                    onChange={updateBusiness}
                    required
                    maxLength={100}
                    placeholder="Your full name"
                  />
                </label>

                <label className="health-field">
                  Business email *
                  <input
                    type="email"
                    name="email"
                    value={business.email}
                    onChange={updateBusiness}
                    required
                    placeholder="you@company.com"
                  />
                </label>

                <label className="health-field">
                  Phone number *
                  <input
                    type="tel"
                    name="phone"
                    value={business.phone}
                    onChange={updateBusiness}
                    required
                    maxLength={20}
                    placeholder="Your contact number"
                  />
                </label>

                <label className="health-field">
                  Website
                  <input
                    type="url"
                    name="website"
                    value={business.website}
                    onChange={updateBusiness}
                    placeholder="https://example.com"
                  />
                </label>

                <label className="health-field">
                  Industry
                  <input
                    name="industry"
                    value={business.industry}
                    onChange={updateBusiness}
                    maxLength={100}
                    placeholder="e.g. Retail, Healthcare, IT"
                  />
                </label>
              </div>
            </section>
          )}

          {currentStep === 1 && (
            <section className="health-step">
              <h2>Website & Digital Presence</h2>
              <p className="health-step-description">
                Let's understand your current online presence.
              </p>
              {renderQuestion(0)}
            </section>
          )}

          {currentStep === 2 && (
            <section className="health-step">
              <h2>Marketing & Customer Communication</h2>
              <p className="health-step-description">
                Tell us how customers connect with your business.
              </p>
              {renderQuestion(3)}
            </section>
          )}

          {currentStep === 3 && (
            <section className="health-step">
              <h2>Technology & Operations</h2>
              <p className="health-step-description">
                Review your operations and customer data management.
              </p>
              {renderQuestion(1)}
              {renderQuestion(2)}
            </section>
          )}

          {currentStep === 4 && (
            <section className="health-step">
              <h2>Business Challenges</h2>
              <p className="health-step-description">
                Understand how your business tracks its performance.
              </p>
              {renderQuestion(4)}
            </section>
          )}

          {currentStep === 5 && (
            <section className="health-step">
              <h2>Review & Submit</h2>
              <p className="health-step-description">
                Check your details and answers before saving your assessment.
              </p>

              <div className="health-review">
                <h3>Business Information</h3>
                <p><strong>Business:</strong> {business.business_name}</p>
                <p><strong>Contact:</strong> {business.contact_name}</p>
                <p><strong>Email:</strong> {business.email}</p>
                <p><strong>Phone:</strong> {business.phone}</p>
                <p><strong>Website:</strong> {business.website || "Not provided"}</p>
                <p><strong>Industry:</strong> {business.industry || "Not provided"}</p>

                <h3>Assessment Answers</h3>
                {questions.map((question, index) => (
                  <p key={question.title}>
                    <strong>{question.title}</strong>
                    <br />
                    {question.options[answers[index]]}
                  </p>
                ))}
              </div>
            </section>
          )}

          {error && (
            <p className="health-error" role="alert">
              {error}
            </p>
          )}

          <div className="health-actions">
            {currentStep > 0 && (
              <button
                className="health-back"
                type="button"
                onClick={goBack}
                disabled={loading}
              >
                ← Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button className="health-submit" type="submit">
                Continue →
              </button>
            ) : (
              <button
                className="health-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Assessment →"}
              </button>
            )}
          </div>

          <p className="health-note">
            This is a general self-assessment, not a financial, legal, or
            security audit. Your submission is sent to our assessment API.
          </p>
        </form>
      ) : (
        <section className="health-results" aria-live="polite">
          <p className="health-eyebrow">YOUR SELF-ASSESSMENT</p>
          <h2>{resultLabel}</h2>

          <div className="health-score">
            <strong>{score}</strong>
            <span> / 10</span>
          </div>

          <p>
            Thank you, {business.contact_name}. Your assessment was submitted
            successfully and saved for review.
          </p>

          {savedSubmission?.id && (
            <p className="health-success">
              Submission reference: #{savedSubmission.id}
            </p>
          )}

          <h3>Suggested next steps</h3>
          <ul>
            {questions.map((question, index) =>
              answers[index] > 0 ? (
                <li key={question.title}>{recommendations[index]}</li>
              ) : null
            )}

            {Object.values(answers).every((answer) => answer === 0) && (
              <li>
                Continue monitoring your digital processes and review them
                regularly as your business grows.
              </li>
            )}
          </ul>

          <button
            className="health-submit"
            onClick={resetAssessment}
            type="button"
          >
            Retake Assessment →
          </button>
        </section>
      )}
    </main>
  );
}
