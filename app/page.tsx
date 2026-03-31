import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* <Works /> */}
        <Skills />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
