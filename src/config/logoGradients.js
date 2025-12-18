export const LOGO_GRADIENT_PATTERNS = [
  {
    id: "soft-diagonal",
    label: "Soft diagonal",
    build: ({ primary, secondary }) =>
      `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
  },
  {
    id: "radial-center",
    label: "Radial center glow",
    build: ({ primary, secondary }) =>
      `radial-gradient(circle at 50% 40%, ${secondary} 0%, ${primary} 55%, transparent 100%)`,
  },
  {
    id: "radial-bottom",
    label: "Radial bottom",
    build: ({ primary, secondary }) =>
      `radial-gradient(circle at 50% 120%, ${primary} 0%, ${secondary} 45%, transparent 80%)`,
  },
];

export function getLogoGradientPattern(id) {
  return LOGO_GRADIENT_PATTERNS.find((p) => p.id === id) || LOGO_GRADIENT_PATTERNS[0];
}


