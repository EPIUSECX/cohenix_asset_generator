import { useMemo, useState } from "react";
import { Command, GalleryVerticalEnd, X } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/config/brand";

const SvgGalleryModal = ({
  show,
  onClose,
  svgList,
  onSelect,
  selectedSvg,
  colorSelection = "#787878",
}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [templateType, setTemplateType] = useState("all");

  const categories = useMemo(() => {
    const unique = new Set(
      svgList.map((svg) => svg.category).filter(Boolean),
    );
    return ["all", ...Array.from(unique)];
  }, [svgList]);

  const templateTypes = useMemo(() => {
    const unique = new Set(
      svgList.map((svg) => svg.templateType).filter(Boolean),
    );
    return ["all", ...Array.from(unique)];
  }, [svgList]);

  const filteredList = useMemo(
    () =>
      svgList.filter((svg) => {
        const matchesCategory =
          category === "all" || svg.category === category;
        const matchesTemplateType =
          templateType === "all" || svg.templateType === templateType;
        const haystack = `${svg.name} ${(svg.tags || []).join(" ")}`.toLowerCase();
        const matchesSearch = !search
          ? true
          : haystack.includes(search.toLowerCase());
        return matchesCategory && matchesTemplateType && matchesSearch;
      }),
    [svgList, search, category, templateType],
  );

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm dark:bg-white/50"
        onClick={onClose}
      />
      <div
        className="fixed top-1/2 left-1/2 z-50 max-h-[80vh] w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md dark:border-black/10"
        role="dialog"
        aria-modal="true"
        aria-label="Logo gallery"
      >
        <div className="flex items-center justify-between border-b border-dashed border-white/10 p-4 dark:border-black/10">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <GalleryVerticalEnd className="h-5 w-5" />
            Gallery.
          </h2>

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
            Close
          </button>
        </div>
        <p className="mx-5 my-2 text-xs dark:text-black">
          Powered by{" "}
          <Link
            href={BRAND.url}
            className="cursor-pointer hover:underline"
          >
            {BRAND.name}
          </Link>
        </p>
        <div className="flex items-center gap-2 px-4 pb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logos..."
            className="w-full rounded-md border border-white/10 bg-black/20 px-2 py-1 text-xs text-white outline-none placeholder:text-white/40 dark:border-black/10 dark:bg-white dark:text-black dark:placeholder:text-black/40"
          />
        </div>
        <div className="flex flex-wrap gap-2 px-4 pb-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-2 py-1 ${
                category === cat
                  ? "border-white bg-white/10 text-white dark:border-black dark:bg-black/10 dark:text-black"
                  : "border-white/10 text-white/80 hover:border-white/40 dark:border-black/10 dark:text-black/70 dark:hover:border-black/40"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
        {templateTypes.length > 1 && (
          <div className="flex flex-wrap gap-2 px-4 pb-2 text-xs">
            {templateTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTemplateType(type)}
                className={`rounded-full border px-2 py-1 ${
                  templateType === type
                    ? "border-white bg-white/10 text-white dark:border-black dark:bg-black/10 dark:text-black"
                    : "border-white/10 text-white/80 hover:border-white/40 dark:border-black/10 dark:text-black/70 dark:hover:border-black/40"
                }`}
              >
                {type === "all"
                  ? "All templates"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}
        <div
          className="overflow-y-auto p-4"
          style={{ maxHeight: "calc(80vh - 220px)" }}
        >
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {filteredList.map((svg, index) => (
              <div
                key={svg.id ?? index}
                onClick={() => onSelect(svg)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(svg);
                  }
                }}
                tabIndex={0}
                aria-pressed={selectedSvg.name === svg.name}
                className={`relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 p-2 transition-all duration-300 hover:scale-105 dark:border-white ${
                  selectedSvg.name === svg.name
                    ? "bg-white/5 dark:bg-black/5"
                    : "border-white/10 bg-white/5 hover:border-white/30 dark:hover:border-black/30"
                }`}
              >
                <div className="relative flex h-full w-full items-center justify-center">
                  {svg.Svg && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg.Svg
                        color={colorSelection || "#787878"}
                        rotation={0}
                        thickness={0}
                        width={30}
                        height={30}
                      />
                    </div>
                  )}
                </div>
                <span className="absolute top-1 left-2 text-[10px] opacity-70">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SvgGalleryModal;
