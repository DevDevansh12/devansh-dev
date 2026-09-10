import { forwardRef, type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  ariaLabel?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, id, title, subtitle, className = "", ariaLabel },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel || title}
      className={`relative scroll-mt-24 py-16 sm:py-24 ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {subtitle && (
            <span className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
});

export default Section;
