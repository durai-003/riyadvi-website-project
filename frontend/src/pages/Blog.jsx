
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock3 } from "lucide-react";
import "./Blog.css";

export const articles = [
  {
    slug: "why-businesses-need-modern-websites",
    category: "WEB DEVELOPMENT",
    image:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Web developer working on a laptop",
    title: "Why Every Business Needs a Modern Website",
    excerpt:
      "Explore how performance, responsive design and usability can improve a business's digital presence.",
    date: "Oct 10, 2026",
    readTime: "5 min read",
    number: "01",
    content: [
      {
        heading: "Your website is your digital first impression",
        text: "A business website helps customers understand your services, explore your work and find ways to contact you. Clear information and intuitive navigation make that experience easier.",
      },
      {
        heading: "Performance matters",
        text: "Slow pages can frustrate visitors. Optimized images, efficient code and sensible loading strategies help create a smoother browsing experience across devices.",
      },
      {
        heading: "Design for every screen",
        text: "Responsive layouts adapt to phones, tablets and desktops. Test navigation, typography, forms and buttons at different screen sizes before launch.",
      },
    ],
  },
  {
    slug: "rest-api-basics-for-beginners",
    category: "BACKEND DEVELOPMENT",
    image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Backend servers and network infrastructure",
    title: "REST APIs Explained for Beginners",
    excerpt:
      "Understand how frontend applications communicate with backend services using REST APIs.",
    date: "Oct 12, 2026",
    readTime: "6 min read",
    number: "02",
    content: [
      {
        heading: "What is an API?",
        text: "An API defines how software systems communicate. A frontend can request information from a backend through an API instead of accessing the database directly.",
      },
      {
        heading: "Understand HTTP methods",
        text: "GET retrieves information, POST creates a resource, PUT or PATCH updates a resource, and DELETE removes a resource when the API permits it.",
      },
      {
        heading: "Handle responses properly",
        text: "A client should handle successful responses, validation errors, authorization failures and server errors. Never expose passwords or private credentials in API responses.",
      },
    ],
  },
  {
    slug: "building-scalable-python-backends",
    category: "PYTHON",
    image:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Programming code displayed on a computer",
    title: "Building Scalable Python Backends",
    excerpt:
      "Learn the fundamentals behind maintainable backend applications, databases and API design.",
    date: "Oct 15, 2026",
    readTime: "7 min read",
    number: "03",
    content: [
      {
        heading: "Start with clear responsibilities",
        text: "Separate request handling, business logic and data access where appropriate. This makes an application easier to test, debug and maintain.",
      },
      {
        heading: "Choose the right data model",
        text: "Use a suitable database schema, validation and indexes based on the application's requirements. Measure performance before optimizing.",
      },
      {
        heading: "Prepare for growth",
        text: "Logging, automated tests, configuration management and monitoring help teams operate applications reliably as usage increases.",
      },
    ],
  },
];

export default function Blog() {
  return (
    <main className="blog-page">
      <section className="blog-hero">
        <p className="blog-eyebrow">INSIGHTS / IDEAS / TECHNOLOGY</p>
        <h1>
          Ideas that move
          <br />
          <span>business forward.</span>
        </h1>
        <p>
          Practical perspectives on software, design and digital
          transformation for curious minds and growing businesses.
        </p>
      </section>

      <section className="blog-listing">
        <div className="blog-section-heading">
          <p className="blog-eyebrow">THE LATEST</p>
          <h2>Explore our insights.</h2>
        </div>

        <div className="blog-grid">
          {articles.map((article) => (
            <article className="blog-card" key={article.slug}>
              <div className={`blog-card-visual blog-visual-${article.number}`}>
                <img
                  className="blog-card-image"
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  />

                  <div className="blog-visual-overlay" aria-hidden="true" />

                  <span>{article.number}</span>
                  <p>RIYADVI / INSIGHTS</p>
              </div>

              <div className="blog-card-content">
                <p className="blog-category">{article.category}</p>
                <h2>{article.title}</h2>
                <p className="blog-excerpt">{article.excerpt}</p>

                <div className="blog-meta">
                  <span>{article.date}</span>
                  <span>
                    <Clock3 size={14} /> {article.readTime}
                  </span>
                </div>

                <Link
                  to={`/blog/${article.slug}`}
                  className="blog-read-link"
                >
                  Read Article <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blog-cta">
        <p className="blog-eyebrow">LET'S BUILD WHAT'S NEXT</p>
        <h2>Have a digital idea to explore?</h2>
        <Link to="/contact" className="blog-cta-link">
          Contact Our Team <ArrowUpRight size={17} />
        </Link>
      </section>
    </main>
  );
}
