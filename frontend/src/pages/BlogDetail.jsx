
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { articles } from "./Blog";
import "./BlogDetail.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <main className="article-page">
        <h1>Article not found</h1>
        <Link to="/blog">Back to Blog</Link>
      </main>
    );
  }

  return (
    <main className="article-page">
      <article>
        <header className="article-header">
          <Link to="/blog" className="article-back">
            <ArrowLeft size={17} /> All Articles
          </Link>

          <p className="article-eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="article-summary">{article.excerpt}</p>

          <div className="article-meta">
            <span>{article.date}</span>
            <span>
              <Clock3 size={15} /> {article.readTime}
            </span>
          </div>

          <div className="article-cover">
            <span>{article.number}</span>
            <h2>RIYADVI / INSIGHTS</h2>
          </div>
        </header>

        <div className="article-body">
          {article.content.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}

          <div className="article-end">
            <p>Have a project related to this topic?</p>
            <Link to="/contact">
              Let's Talk <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
