"use client";
import Link from "next/link";
import { Code2, Share2, User, Mail, Heart, ArrowUp } from "lucide-react";
import Behance from "./icons/Behance";
import styles from "./Footer.module.css";

const links = {
  Navigation: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Works", href: "#works" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
  ],
  Resources: [
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],
};

const socials = [
  { icon: Code2, href: "https://github.com/Fazilks", label: "GitHub" },
  { icon: User, href: "https://www.linkedin.com/in/fazil-k-shafeek", label: "LinkedIn" },
  // { icon: Behance, href: "https://behance.net", label: "Behance" },
  // { icon: Share2, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:fazilpaki@gmail.com", label: "Email" },
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const scrollTo = (href: string) => {
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top gradient border */}
      <div className={styles.topBorder} />

      <div className={styles.orb} />

      <div className="container">
        <div className={styles.main}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoDot} />
              &lt;Dev/&gt;
            </div>
            <p className={styles.brandDesc}>
              Crafting immersive digital experiences that blend beautiful
              design with cutting-edge technology.
            </p>
            <div className={styles.socials}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className={styles.social}
                  aria-label={label}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>{group}</h4>
              <ul className={styles.linkList}>
                {items.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith("#") ? (
                      <button
                        className={styles.navLink}
                        onClick={() => scrollTo(href)}
                      >
                        {label}
                      </button>
                    ) : (
                      <Link href={href} className={styles.navLink}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className={styles.newsletter}>
            <h4 className={styles.groupTitle}>Stay Updated</h4>
            <p className={styles.newsletterDesc}>
              Get notified when I publish new articles or launch projects.
            </p>
            <div className={styles.newsletterForm}>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                className={styles.newsletterInput}
                aria-label="Email for newsletter"
              />
              <button id="newsletter-submit" className={styles.newsletterBtn}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Dev Portfolio. Crafted with{" "}
            <Heart size={13} className={styles.heart} fill="currentColor" /> using Next.js, Three.js &amp; GSAP.
          </p>
          <button
            id="scroll-top-btn"
            className={styles.scrollTop}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
