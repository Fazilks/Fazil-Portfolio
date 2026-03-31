"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Users, Coins, Rocket } from "lucide-react";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Target, label: "Strategic Thinking", desc: "I analyze your idea and guide you toward the most effective execution path" },
  { icon: Users, label: "Curated Network", desc: "Work with reliable, vetted professionals across tech and design." },
  { icon: Coins, label: "Better Value", desc: "Get more done within budget through optimized pricing and resources." },
  { icon: Rocket, label: "Smooth Delivery", desc: "I help streamline communication and project flow from start to finish." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from(textRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Cards stagger
      gsap.from(cardsRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.4)",
      });

      // Image parallax
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        x: 80,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={`section ${styles.about}`}>
      <div className={`${styles.orb}`} />

      <div className="container">
        <div className={styles.grid}>
          {/* Text side */}
          <div ref={textRef} className={styles.textSide}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Building digital <span className="gradient-text">experiences</span> that matter
            </h2>
            <div className="divider" />
            <p className={styles.bio}>
             I’m an MCA graduate with a strong foundation in Python and MERN technologies, with a clear understanding of how modern web applications are built and scaled. While I have technical knowledge, my primary focus is on connecting ideas with the right people, tools, and strategies to ensure efficient execution.
            </p>
            <p className={styles.bio}>
            I work with a network of trusted developers, designers, and service providers to help individuals, startups, and businesses bring their ideas to life. Along with connecting the right team, I also help optimize costs by providing access to quality services and products at competitive rates making the entire process smarter, smoother, and more practical.
            </p>
            <div className={styles.infoGrid}>
              {[
                { label: "Location", value: "Ernakulam, Kerala, India" },
                { label: "Email", value: "fazilpaki@gmail.com" },
                { label: "Experience", value: "2+ Years" },
                { label: "Availability", value: "Open to Work" },
              ].map(({ label, value }) => (
                <div key={label} className={styles.infoItem}>
                  <span className={styles.infoLabel}>{label}</span>
                  <span className={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-primary" onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }} style={{ width: "fit-content" }}>
              Let&apos;s Talk
            </a>
          </div>

          {/* Image / Avatar side */}
          <div ref={imageRef} className={styles.imageSide}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatarRing} />
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>DEV</span>
              </div>
              <div className={styles.floatingBadge}>
                <span>🚀</span>
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div ref={cardsRef} className={styles.cards}>
          {highlights.map(({ icon: Icon, label, desc }) => (
            <div key={label} className={`glass-card ${styles.card}`}>
              <div className={styles.cardIcon}>
                <Icon size={22} />
              </div>
              <h3 className={styles.cardTitle}>{label}</h3>
              <p className={styles.cardDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
