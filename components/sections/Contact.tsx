"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { Mail, Phone, MapPin, Send, Code2, User } from "lucide-react";
import Behance from "@/components/icons/Behance";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

const GlobeScene = dynamic(() => import("@/components/three/GlobeScene"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%" }} />,
});

const socials = [
  { icon: Code2, href: "https://github.com/Fazilks", label: "GitHub" },
  { icon: User, href: "https://www.linkedin.com/in/fazil-k-shafeek", label: "LinkedIn" },
  { icon: Behance, href: "https://behance.net", label: "Behance" },
  { icon: Send, href: "https://twitter.com", label: "Twitter" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "fazilpaki@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 871 424 5455" },
  { icon: MapPin, label: "Location", value: "Ernakulam, Kerala , India" }, 
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        opacity: 0, x: -60, duration: 0.9, ease: "power3.out",
      });
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        opacity: 0, x: 60, duration: 0.9, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );
      
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus("error"); // Will add error UI state below
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className={`section ${styles.contact}`}>
      <div className={styles.globe}>
        <GlobeScene />
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Left info */}
          <div ref={leftRef} className={styles.infoSide}>
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">
              Let&apos;s <span className="gradient-text">Build Something Together.Smarter & Better</span>
            </h2>
            <div className="divider" />
            <p className={styles.desc}>
              I connect you with trusted developers, designers, and professionals while helping you access quality services and products at competitive rates.
            </p>

            <div className={styles.contactList}>
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className={styles.contactItem}>
                  <div className={styles.contactIcon}><Icon size={18} /></div>
                  <div>
                    <span className={styles.contactLabel}>{label}</span>
                    <span className={styles.contactValue}>{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.socials}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className={styles.social} aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div ref={rightRef}>
            <form className={`glass-card ${styles.form}`} onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    className={styles.input}
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className={styles.input}
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  className={styles.input}
                  type="text"
                  placeholder="Project collaboration"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>
              <button
                id="contact-submit"
                type="submit"
                className={`btn-primary ${styles.submit}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <span className={styles.spinner} />
                ) : status === "sent" ? (
                  "✓ Message Sent!"
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
              {status === "sent" && (
                <p className={styles.successMsg}>
                  🎉 Thanks! I&apos;ll get back to you within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p className={styles.errorMsg} style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center", marginTop: "1rem" }}>
                  Oops! Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
