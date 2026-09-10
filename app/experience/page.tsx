import type { Metadata } from "next";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience & Education | Devansh Variya",
  description:
    "Career timeline, software engineering roles at MaMo TechnoLabs, Getmeonline, Insanis Brain, and education at Parul University.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-20 sm:pt-24">
      <Experience />
    </div>
  );
}
