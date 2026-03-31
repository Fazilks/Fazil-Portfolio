"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Code2 } from "lucide-react";
import styles from "./Works.module.css";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web App", "3D / Creative", "Mobile", "Design"];

const projects = [
  {
    title: "NebulaOS",
    desc: "A cloud OS dashboard with real-time metrics, 3D visualisations, and AI-powered insights.",
    tags: ["Next.js", "Three.js", "Node.js"],
    category: "Web App",
    color: "#ef4444",
    emoji: "🌌",
  },
  {
    title: "Lumina Studio",
    desc: "3D product configurator for luxury brands — real-time PBR rendering in the browser.",
    tags: ["React", "Three.js", "WebGL"],
    category: "3D / Creative",
    color: "#991b1b",
    emoji: "✨",
  },
  {
    title: "TradeFlow",
    desc: "Crypto trading platform with live charts, portfolio management, and smart alerts.",
    tags: ["React", "Node.js", "WebSocket"],
    category: "Web App",
    color: "#404040",
    emoji: "📈",
  },
  {
    title: "Botanica",
    desc: "AR-powered plant care app that identifies plants and tracks health in real time.",
    tags: ["React Native", "TensorFlow", "AR"],
    category: "Mobile",
    color: "#dc2626",
    emoji: "🌿",
  },
  {
    title: "Vortex UI",
    desc: "Award-winning design system with 200+ components, dark mode, and accessibility built-in.",
    tags: ["React", "Figma", "Storybook"],
    category: "Design",
    color: "#525252",
    emoji: "🎨",
  },
  {
    title: "Echoes",
    desc: "Generative art platform where music shapes real-time 3D scenes and exportable visuals.",
    tags: ["Three.js", "Web Audio", "GLSL"],
    category: "3D / Creative",
    color: "#ef4444",
    emoji: "🎵",
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children ?? [], {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      scale: 0.94,
      duration: 0.5,
      stagger: 0.08,
      ease: "back.out(1.4)",
    });
  }, [filtered]);

  return (
    <section id="works" ref={sectionRef} className={`section ${styles.works}`}>
      <div className={styles.orb} />
      <div className="container">
        {/* Head */}
        <div ref={headRef} className={styles.head}>
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            Selected <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle">
            A curated collection of projects that showcase my range — from immersive 3D
            experiences to scalable full-stack applications.
          </p>
        </div>

        {/* Filter tabs */}
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filter} ${active === cat ? styles.filterActive : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className={styles.grid}>
          {filtered.map((project) => (
            <div key={project.title} className={`glass-card ${styles.card}`}>
              {/* Card header */}
              <div className={styles.cardHeader} style={{ "--card-color": project.color } as React.CSSProperties}>
                <div className={styles.cardEmoji}>{project.emoji}</div>
                <div className={styles.cardActions}>
                  <button className={styles.cardAction} aria-label="View on GitHub">
                    <Code2 size={16} />
                  </button>
                  <button className={styles.cardAction} aria-label="Open project">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.desc}</p>
                <div className={styles.cardTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
