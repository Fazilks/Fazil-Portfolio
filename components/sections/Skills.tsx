"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Programming Languages",
    icon: "💻",
    skills: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    icon: "⚙️",
    skills: ["React.js", "ASP.NET"],
  },
  {
    title: "Databases",
    icon: "🗄️",
    skills: ["MySQL"],
  },
  {
    title: "Tools & Technologies",
    icon: "🧰",
    skills: ["Git & GitHub", "VS Code", "Canva", "Microsoft Excel"],
  },
  {
    title: "Design & UI",
    icon: "🎨",
    skills: ["Responsive Design", "UI/UX Fundamentals", "Figma (basic)"],
  },
  {
    title: "Soft Skills",
    icon: "🤝",
    skills: ["Communication", "Problem Solving", "Mentoring & Teaching", "Collaboration", "Analytical Thinking"],
  },
  {
    title: "Languages",
    icon: "🌐",
    skills: ["English (Fluent)", "Malayalam (Native)", "Hindi (Basic – can understand and speak)"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children ?? [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: "power3.out",
      });

      // Animate groups
      gsap.from(groupsRef.current?.children ?? [], {
        scrollTrigger: { trigger: groupsRef.current, start: "top 80%", once: true },
        opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={`section ${styles.skills}`}>
      <div className={styles.orb} />
      <div className="container">
        <div ref={headRef} className={styles.head}>
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Skills &amp; <span className="gradient-text">Technologies</span></h2>
          <div className="divider" />
          <p className="section-subtitle">
            A specialized toolkit focused on creating impactful digital solutions through modern technology and strategic design.
          </p>
        </div>

        {/* Skill groups */}
        <div ref={groupsRef} className={styles.groups}>
          {skillGroups.map((group) => (
            <div key={group.title} className={`glass-card ${styles.group}`}>
              <div className={styles.groupHeader}>
                <div className={styles.groupDot} />
                <h3 className={styles.groupTitle}>{group.icon} {group.title}</h3>
              </div>
              <div className={styles.skillList}>
                {group.skills.map((skill) => (
                  <div key={skill} className={styles.skillItem}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
