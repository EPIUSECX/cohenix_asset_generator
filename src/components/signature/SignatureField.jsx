"use client";

export default function SignatureField({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="relative mt-4 px-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-light">
          {label}
        </span>
      </div>
      <div className="flex justify-between rounded-lg p-1">
        <input
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          type={type}
          className="peer relative flex w-full items-center rounded-xl border border-white/5 bg-transparent p-2 text-xs text-white transition-opacity duration-500 outline-none placeholder:text-white/40 dark:border-black/30 dark:text-black"
        />
      </div>
    </div>
  );
}


