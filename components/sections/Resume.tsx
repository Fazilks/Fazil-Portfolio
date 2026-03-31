"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, FileText, Eye } from "lucide-react";
import styles from "./Resume.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children ?? [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="resume" ref={sectionRef} className={`section ${styles.resume}`}>
      <div className={styles.orb} />
      <div className="container">
        <div ref={contentRef} className={styles.inner}>
          {/* Header */}
          <div className={styles.header}>
            <span className="section-label">Documents</span>
            <h2 className="section-title">Resume <span className="gradient-text">&amp; CV</span></h2>
            <div className="divider" />
            <p className="section-subtitle">
              Get a full overview of my skills, experience, and achievements. Available to download instantly.
            </p>
          </div>

          {/* Preview card */}
          <div className={`glass-card ${styles.previewCard}`}>
            {/* Mock CV preview */}
            <div className={styles.cvMock}>
              <div className={styles.cvHeader}>
                <div className={styles.cvAvatar} />
                <div className={styles.cvLines}>
                  <div className={`${styles.cvLine} ${styles.cvLineLg}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineMd}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineSm}`} />
                </div>
              </div>
              <div className={styles.cvBody}>
                <div className={styles.cvSection}>
                  <div className={`${styles.cvLine} ${styles.cvLineSm} ${styles.cvLineAccent}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineLg}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineMd}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineLg}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineSm}`} />
                </div>
                <div className={styles.cvSection}>
                  <div className={`${styles.cvLine} ${styles.cvLineSm} ${styles.cvLineAccent}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineMd}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineLg}`} />
                  <div className={`${styles.cvLine} ${styles.cvLineMd}`} />
                </div>
                <div className={styles.cvSection}>
                  <div className={`${styles.cvLine} ${styles.cvLineSm} ${styles.cvLineAccent}`} />
                  <div className={styles.cvSkillRow}>
                    {["React", "Node", "TS", "Next"].map((s) => (
                      <span key={s} className={styles.cvSkillChip}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay */}
            <div className={styles.previewOverlay}>
              <FileText size={48} className={styles.overlayIcon} />
              <p className={styles.overlayText}>Resume Preview</p>
              <div className={styles.overlayActions}>
                <a
                  href="/assets/Fazil_K_Shafeek CR.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  <Eye size={16} /> Preview
                </a>
                <a href="/assets/Fazil_K_Shafeek CR.pdf" download className="btn-primary">
                  <Download size={16} /> Download PDF
                </a>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className={styles.strip}>
            {[
              { label: "Total Experience", value: "5+ Years" },
              { label: "Projects Shipped", value: "50+" },
              { label: "Technologies", value: "30+" },
              { label: "Open Source", value: "15 PRs" },
            ].map(({ label, value }) => (
              <div key={label} className={`glass-card ${styles.stripItem}`}>
                <span className={styles.stripValue}>{value}</span>
                <span className={styles.stripLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
