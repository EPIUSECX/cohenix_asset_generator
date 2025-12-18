export const LOGO_FONT_PRESETS = [
  {
    id: "sans",
    label: "Cohenix Sans",
    stack:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Arial, sans-serif",
  },
  {
    id: "rounded",
    label: "Cohenix Rounded",
    stack:
      "'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Arial, sans-serif",
  },
  {
    id: "mono",
    label: "Cohenix Mono",
    stack:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
];

export const LOGO_BACKGROUND_PRESETS = [
  {
    id: "brand-dark",
    label: "Brand dark",
    cardBgClass: "bg-[#0A0A0A] dark:bg-white",
  },
  {
    id: "soft-light",
    label: "Soft light",
    cardBgClass: "bg-white",
  },
  {
    id: "off-white",
    label: "Off‑white",
    cardBgClass: "bg-neutral-50",
  },
];

export function getLogoFontPreset(id) {
  return LOGO_FONT_PRESETS.find((p) => p.id === id) || LOGO_FONT_PRESETS[0];
}

export function getLogoBackgroundPreset(id) {
  return (
    LOGO_BACKGROUND_PRESETS.find((p) => p.id === id) || LOGO_BACKGROUND_PRESETS[0]
  );
}


