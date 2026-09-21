"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhoneAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaGithub,
  FaLinkedin,
  FaSpinner,
} from "react-icons/fa";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

type SendMethod = "whatsapp" | "smtp";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [sendMethod, setSendMethod] = useState<SendMethod | null>(null);

  function buildContactMessage() {
    if (name.trim() || message.trim()) {
      const parts = ["Hello Devansh,\n\nI would like to connect with you regarding a project."];
      if (name.trim()) parts.push(`Name: ${name.trim()}`);
      if (email.trim()) parts.push(`Email: ${email.trim()}`);
      if (message.trim()) parts.push(`\nMessage:\n${message.trim()}`);
      return parts.join("\n");
    }
    return "Hello Devansh, I would like to connect with you regarding a project.";
  }

  async function handleSend(method: SendMethod) {
    try {
      setError(null);
      setStatus("sending");
      setSendMethod(method);

      if (method === "whatsapp") {
        const contactMessage = buildContactMessage();
        const whatsappNumber = "916355662753";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contactMessage)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setSuccessMessage("WhatsApp opened! Complete sending your message in the app window.");
        setStatus("sent");
        return;
      }

      if (method === "smtp") {
        if (!name.trim()) {
          setError("Please enter your name.");
          setStatus("idle");
          return;
        }
        if (!email.trim() || !validateEmail(email)) {
          setError("Please enter a valid email address.");
          setStatus("idle");
          return;
        }
        if (!message.trim() || message.trim().length < 5) {
          setError("Please enter a message (at least 5 characters).");
          setStatus("idle");
          return;
        }

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.code === "SMTP_UNCONFIGURED") {
            // Graceful fallback to mailto if SMTP credentials are still awaiting setup in .env.local
            const subject = `Portfolio Project Inquiry from ${name.trim()}`;
            const body = buildContactMessage();
            window.location.href = `mailto:74devanshvariya@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setSuccessMessage("Note: Server SMTP password needs to be set in .env.local. Your default email client was opened as a backup!");
            setStatus("sent");
            return;
          }
          setError(data.error || "Failed to send message via SMTP. Please try again or use WhatsApp.");
          setStatus("error");
          return;
        }

        setSuccessMessage("Thank you! Your message has been sent successfully. I'll get back to you soon.");
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error("Contact dispatch error:", err);
      setError("Network error while sending message. Please try again or reach out on WhatsApp.");
      setStatus("error");
    }
  }

  return (
    <Section id="contact" className="py-20 sm:py-28">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            Let&apos;s Build Something Together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-400">
            Have a project in mind, an opportunity to discuss, or just want to connect? Reach out via WhatsApp or email.
          </p>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 max-w-5xl mx-auto">
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-white/10 dark:bg-slate-900/80 card-hover-lift">
            <div>
              <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-2">
                Contact Details
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Devansh Variya
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Full Stack Developer specialized in building scalable, responsive web solutions with Next.js and modern stack tooling.
              </p>

              <div className="mt-6 space-y-3">
                {/* Email card */}
                <div className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-white/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Direct Email
                    </p>
                    <a
                      href="mailto:74devanshvariya@gmail.com"
                      className="mt-0.5 block truncate text-xs sm:text-sm font-semibold text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
                    >
                      74devanshvariya@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone / WhatsApp card */}
                <div className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-white/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <FaPhoneAlt className="text-xs" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Phone / WhatsApp
                    </p>
                    <a
                      href="tel:+916355662753"
                      className="mt-0.5 block truncate text-xs sm:text-sm font-semibold text-slate-800 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400"
                    >
                      +91 6355662753
                    </a>
                  </div>
                </div>

                {/* Location card */}
                <div className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Location
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Vadodara, Gujarat, India
                    </p>
                  </div>
                </div>

                {/* Direct Profile Links */}
                <div className="pt-2">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Online Profiles
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://github.com/devdevansh12"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/10"
                    >
                      <FaGithub className="text-sm" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/devansh-variya/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/10"
                    >
                      <FaLinkedin className="text-sm text-[#0a66c2]" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability status */}
            <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                Ready to take on new projects & opportunities
              </span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-white/10 dark:bg-slate-900/80 card-hover-lift">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Send a Direct Message
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Fill out the message details below and select your preferred method to send.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                      setStatus("idle");
                    }}
                    placeholder="e.g. Alex Smith"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 dark:border-white/15 dark:bg-slate-950/60 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-950 dark:focus:border-emerald-400 dark:focus:ring-1 dark:focus:ring-emerald-400/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                      setStatus("idle");
                    }}
                    placeholder="alex@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 dark:border-white/15 dark:bg-slate-950/60 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-950 dark:focus:border-emerald-400 dark:focus:ring-1 dark:focus:ring-emerald-400/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Project Message
                  </label>
                  <span className="text-xs text-slate-400">
                    {message.length}/500
                  </span>
                </div>
                <textarea
                  value={message}
                  maxLength={500}
                  rows={5}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setError(null);
                    setStatus("idle");
                  }}
                  placeholder="Describe your project, timeline, or question..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 dark:border-white/15 dark:bg-slate-950/60 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-950 dark:focus:border-emerald-400 dark:focus:ring-1 dark:focus:ring-emerald-400/20"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                  {error}
                </div>
              )}

              {status === "sent" && (
                <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <FaCheckCircle className="mt-0.5 text-sm shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{successMessage || "Thank you! Your message has been dispatched successfully."}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleSend("smtp")}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] px-5 py-3 text-xs font-semibold text-white shadow-2xs transition-all duration-150 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 cursor-pointer"
                >
                  {sendMethod === "smtp" && status === "sending" ? (
                    <FaSpinner className="text-xs text-white dark:text-slate-950 animate-spin" />
                  ) : (
                    <FaEnvelope className="text-xs text-white dark:text-slate-950" />
                  )}
                  <span>
                    {sendMethod === "smtp" && status === "sending" ? "Sending..." : "Send Message"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSend("whatsapp")}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] px-5 py-3 text-xs font-semibold text-white shadow-2xs transition-all duration-150 cursor-pointer"
                >
                  <FaWhatsapp className="text-sm text-white" />
                  <span>
                    {sendMethod === "whatsapp" && status === "sending" ? "Opening WhatsApp..." : "Send via WhatsApp"}
                  </span>
                </button>
              </div>

              <p className="flex items-center justify-center gap-1.5 pt-2 text-center text-xs text-slate-400 dark:text-slate-500">
                <FaPaperPlane className="text-[10px]" />
                <span>Your message will be sent directly to 74devanshvariya@gmail.com</span>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
