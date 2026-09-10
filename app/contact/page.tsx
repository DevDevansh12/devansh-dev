import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact & Hire | Devansh Variya",
  description:
    "Get in touch with Devansh Variya for freelance web projects, full-time engineering roles, and AI-integrated web applications.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <Contact />
    </div>
  );
}
