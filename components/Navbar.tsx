"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Highlight active section
      const sections = navLinks
        .filter((l) => l.href.startsWith("#"))
        .map((l) => document.querySelector(l.href))
        .filter(Boolean) as HTMLElement[];

      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY >= sections[i].offsetTop - 120) {
          setActive(`#${sections[i].id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoDot} />&lt;Dev/&gt;
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              {href.startsWith("#") ? (
                <button
                  className={`${styles.link} ${active === href ? styles.linkActive : ""}`}
                  onClick={() => handleNavClick(href)}
                >
                  {label}
                </button>
              ) : (
                <Link href={href} className={styles.link}>{label}</Link>
              )}
            </li>
          ))}
        </ul>

        {/* Hire me CTA */}
        <a href="#contact" className={styles.cta} onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}>
          Hire Me
        </a>

        {/* Mobile burger */}
        <button
          className={styles.burger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ""}`}>
        {navLinks.map(({ href, label }) => (
          href.startsWith("#") ? (
            <button
              key={href}
              className={`${styles.drawerLink} ${active === href ? styles.linkActive : ""}`}
              onClick={() => handleNavClick(href)}
            >
              {label}
            </button>
          ) : (
            <Link key={href} href={href} className={styles.drawerLink} onClick={() => setMobileOpen(false)}>
              {label}
            </Link>
          )
        ))}
      </div>
    </nav>
  );
}
