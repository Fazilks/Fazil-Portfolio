"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "Nexus AI",
    location: "San Francisco, CA",
    period: "2023 — Present",
    desc: "Leading the frontend team building AI-powered SaaS products. Architected a real-time 3D data visualisation system used by Fortune 500 clients. Improved core web vitals by 40%.",
    tags: ["React", "Next.js", "Three.js", "TypeScript"],
    type: "current",
  },
  {
    role: "R&D Engineer",
    company: "Luminar Technolab",
    location: "Kochi, Kerala",
    period: "2024 — 2026",
    desc: "R&D Engineer specializing in creating beginner-friendly learning experiences, mentoring aspiring developers, and continuously enhancing training content through research and emerging technologies.",
    tags: ["HTML", "CSS", "JS", "React", "Node.js"],
    type: "past",
  },
  {
    role: "Junior Software Engineer",
    company: "Sprintline Private Limited",
    location: "Trivandrum, Kerala",
    period: "2021 — 2022",
    desc: "Worked as a software engineer specializing in ASP.NET-based web development.",
    tags: ["ASP.net", "SQL", "C#", "HTML", "CSS",],
    type: "past",
  },
  // {
  //   role: "UI Developer Intern"
  //   company: "Dreama Agency",
  //   location: "New York, NY",
  //   period: "2019 — 2020",
  //   desc: "Collaborated on 20+ client websites. Focused on CSS animation, accessibility, and performance optimisation. Received full-time offer upon graduation.",
  //   tags: ["HTML", "CSS", "JavaScript", "Figma"],
  //   type: "past",
  // },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children ?? [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: "power3.out",
      });

      // Draw timeline line
      gsap.from(lineRef.current, {
        scrollTrigger: { trigger: timelineRef.current, start: "top 80%", once: true },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power2.out",
      });

      // Each card
      const cards = timelineRef.current?.querySelectorAll("[data-card]");
      cards?.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
          opacity: 0,
          x: isLeft ? -60 : 60,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={`section ${styles.experience}`}>
      <div className={styles.orb} />
      <div className="container">
        <div ref={headRef} className={styles.head}>
          <span className="section-label">Career</span>
          <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
          <div className="divider" />
          <p className="section-subtitle">
            A journey through roles that shaped my skills and perspective on building great software.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className={styles.timeline}>
          <div ref={lineRef} className={styles.timelineLine} />

          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              data-card
              className={`${styles.item} ${i % 2 === 0 ? styles.itemLeft : styles.itemRight}`}
            >
              <div className={`glass-card ${styles.card}`}>
                <div className={styles.cardTop}>
                  <div className={`${styles.badge} ${exp.type === "current" ? styles.badgeCurrent : ""}`}>
                    {exp.type === "current" ? "Current" : "Past"}
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}><Calendar size={13} />{exp.period}</span>
                    <span className={styles.metaItem}><MapPin size={13} />{exp.location}</span>
                  </div>
                </div>
                <h3 className={styles.role}>{exp.role}</h3>
                <div className={styles.company}><Briefcase size={14} />{exp.company}</div>
                <p className={styles.desc}>{exp.desc}</p>
                <div className={styles.tags}>
                  {exp.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
              {/* Dot */}
              <div className={`${styles.dot} ${exp.type === "current" ? styles.dotActive : ""}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
