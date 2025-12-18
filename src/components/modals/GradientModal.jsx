"use client";

import { useState, useMemo } from "react";
import { Command, X, Palette } from "lucide-react";
import { LOGO_GRADIENT_PATTERNS } from "@/config/logoGradients";

export default function GradientModal({
  show,
  onClose,
  initialPatternId,
  initialPrimary,
  initialSecondary,
  onSave,
}) {
  const [patternId, setPatternId] = useState(initialPatternId);
  const [primary, setPrimary] = useState(initialPrimary);
  const [secondary, setSecondary] = useState(
    initialSecondary || "#4f46e5",
  );

  const selectedPattern = useMemo(
    () =>
      LOGO_GRADIENT_PATTERNS.find((p) => p.id === patternId) ||
      LOGO_GRADIENT_PATTERNS[0],
    [patternId],
  );

  if (!show) return null;

  const previewStyle = {
    backgroundImage: selectedPattern.build({
      primary,
      secondary,
    }),
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm dark:bg-white/50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 z-50 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-md dark:border-black/10 dark:bg-white">
        <div className="mb-3 flex items-center justify-between border-b border-dashed border-white/10 pb-2 text-sm dark:border-black/10">
          <span className="flex items-center gap-2 font-semibold">
            <Palette className="h-4 w-4" />
            Gradient background
          </span>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs font-light active:bg-white/10 dark:border-black/10"
            onClick={onClose}
          >
            <div className="flex cursor-pointer items-center rounded-sm border border-white/10 px-2 py-1 text-[10px] font-light dark:border-black/10">
              <Command className="h-3 w-3" />
              Esc
            </div>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-3 h-20 w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 dark:border-black/10 dark:bg-neutral-100">
          <div className="h-full w-full" style={previewStyle} />
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2">
          {LOGO_GRADIENT_PATTERNS.map((pattern) => (
            <button
              key={pattern.id}
              type="button"
              onClick={() => setPatternId(pattern.id)}
              className={`flex h-16 items-center justify-center overflow-hidden rounded-xl border text-xs ${
                patternId === pattern.id
                  ? "border-white bg-white/10 text-white dark:border-black dark:bg-black/10 dark:text-black"
                  : "border-white/10 text-white/70 hover:border-white/40 dark:border-black/10 dark:text-black/70 dark:hover:border-black/40"
              }`}
            >
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: pattern.build({
                    primary,
                    secondary,
                  }),
                }}
              />
            </button>
          ))}
        </div>

        <div className="mb-3 grid grid-cols-2 gap-3 text-xs">
          <label className="flex flex-col gap-1">
            <span>Start color</span>
            <input
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              className="h-9 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent dark:border-black/10"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>End color</span>
            <input
              type="color"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              className="h-9 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent dark:border-black/10"
            />
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-2 text-xs">
          <button
            type="button"
            className="rounded-full border border-white/20 px-4 py-2 text-white/80 hover:border-white/40 hover:text-white dark:border-black/20 dark:text-black/80 dark:hover:border-black/40"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-4 py-2 font-medium text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800"
            onClick={() => {
              onSave?.({
                patternId,
                primary,
                secondary,
              });
              onClose?.();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}


