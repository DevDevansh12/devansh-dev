Temp plan (dark/light mode button)

Information gathered:
- ThemeToggle.tsx sets `document.documentElement.dataset.theme = next` (light/dark) and stores value in localStorage.
- app/globals.css currently defines `:root` vars for light, but `html` is hardcoded to dark vars.
- Core components (Section, Button, Badge, Navbar, Footer, etc.) heavily use hardcoded Tailwind `text-white`, `bg-black`, and `dark:*` classes, so the toggle can’t reliably switch visuals.

Plan:
1) Update app/globals.css
   - Add `html[data-theme="light"]` and `html[data-theme="dark"]` var definitions.
   - Remove the unconditional `html { --background: #0a0a0a; ... }` override.
2) Update ui components to rely on CSS variables instead of hardcoded text/border colors:
   - components/ui/Section.tsx: replace `text-white*` with `text-[color:var(--foreground)]` etc.
   - components/ui/Badge.tsx: border/background/text use vars.
   - components/ui/Button.tsx: border/bg/text use vars.
3) Update sections that use many hardcoded white/gray colors where it affects readability:
   - Navbar.tsx, Footer.tsx, Experience.tsx, Contact.tsx, Skills.tsx, Hero.tsx, Projects.tsx (minimal replacements to make toggle visibly correct).
   - Keep accent colors (indigo/emerald) as-is.
4) Ensure scrollbars/background also change with theme.
5) Run `npm run lint` and `npm run build` (or `npm run test` if present) to confirm build stability.

Dependent files to edit:
- app/globals.css
- components/ui/Section.tsx
- components/ui/Badge.tsx
- components/ui/Button.tsx
- components/sections/Navbar.tsx
- components/sections/Footer.tsx
- components/sections/Experience.tsx
- components/sections/Contact.tsx
- components/sections/Skills.tsx
- components/sections/Hero.tsx
- components/sections/Projects.tsx
- TODO.md (status updates)

Followup steps:
- Verify toggle persists after refresh (localStorage)
- Verify initial theme uses stored theme or prefers-color-scheme
- Test in both routes/desktop+mobile navbar

