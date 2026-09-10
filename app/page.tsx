import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Below-fold sections: loaded dynamically for optimal performance
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Skills     = dynamic(() => import("@/components/sections/Skills"));
const Projects   = dynamic(() => import("@/components/sections/Projects"));
const Contact    = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
