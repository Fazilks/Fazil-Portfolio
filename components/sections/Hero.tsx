"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Download } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(titleRef.current?.children ?? [], {
      opacity: 0,
      y: 80,
      duration: 1.2,
      stagger: 0.2,
    })
    .from(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1")
    .from(subtitleRef.current, { 
      opacity: 0, 
      y: 30, 
      duration: 0.8 
    }, "-=0.8")
    .from(ctaRef.current?.children ?? [], {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.15,
    }, "-=0.4");
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Background orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      <div className={styles.inner}>
        {/* Left: Text */}
        <div className={styles.content}>
          <h1 ref={titleRef} className={styles.title}>
            <span>FAZIL</span>
            <span className="gradient-text">K SHAFEEK</span>
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            I’m a tech enthusiast with an MCA background, exploring the space between design and development. I enjoy creating clean, engaging digital experiences and constantly experimenting to improve how products look and feel.
          </p>

          <div ref={ctaRef} className={styles.ctas}>
            <a href="#works" className="btn-primary" onClick={(e) => {
              e.preventDefault();
              document.querySelector("#works")?.scrollIntoView({ behavior: "smooth" });
            }}>
              View My Work
            </a>
            <a href="#resume" className="btn-outline" onClick={(e) => {
              e.preventDefault();
              document.querySelector("#resume")?.scrollIntoView({ behavior: "smooth" });
            }}>
              <Download size={16} /> Download CV
            </a>
          </div>
        </div>

        {/* Right: Portrait Image */}
        <div ref={imageRef} className={styles.imageFrame}>
          <div className={styles.imageBackdrop} />
          <div className={styles.imageWrapper}>
            <Image 
              src="/assets/new.jpeg" 
              alt="Fazil K Shafeek - Creative Developer" 
              width={800} 
              height={800} 
              className={styles.portrait}
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll prompt */}
      <button className={styles.scrollBtn} onClick={scrollToAbout} aria-label="Scroll down">
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
