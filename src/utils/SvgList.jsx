const svgFiles = [
  // Make ERP the first/default logo
  {
    name: "ERP",
    file: "erp.svg",
    category: "Business",
    tags: ["erp", "operations", "system"],
  },
  {
    name: "Books",
    file: "Books.svg",
    category: "Knowledge",
    tags: ["books", "library", "knowledge"],
  },
  {
    name: "Builder",
    file: "Builder.svg",
    category: "Platform",
    tags: ["builder", "platform", "tools"],
  },
  {
    name: "Cohenix Framework",
    file: "cohenix-framework.svg",
    category: "Platform",
    tags: ["framework", "cohenix"],
  },
  {
    name: "CRM",
    file: "crm.svg",
    category: "Business",
    tags: ["crm", "sales", "customers"],
  },
  {
    name: "Drive",
    file: "Drive.svg",
    category: "Storage",
    tags: ["drive", "storage", "files"],
  },
  {
    name: "Education",
    file: "Education.svg",
    category: "Knowledge",
    tags: ["education", "learning"],
  },
  {
    name: "Gameplan",
    file: "Gameplan.svg",
    category: "Planning",
    tags: ["plan", "strategy", "roadmap"],
  },
  {
    name: "Health",
    file: "Health.svg",
    category: "Health",
    tags: ["health", "wellness"],
  },
  {
    name: "Helpdesk",
    file: "Helpdesk.svg",
    category: "Support",
    tags: ["support", "helpdesk"],
  },
  {
    name: "HR",
    file: "HR.svg",
    category: "People",
    tags: ["hr", "people", "team"],
  },
  {
    name: "Insights",
    file: "Insights.svg",
    category: "Analytics",
    tags: ["analytics", "insights", "reports"],
  },
  {
    name: "LMS",
    file: "LMS.svg",
    category: "Knowledge",
    tags: ["lms", "learning", "courses"],
  },
  {
    name: "Wiki",
    file: "WIKI.svg",
    category: "Knowledge",
    tags: ["wiki", "documentation"],
  },
];

export const SvgList = svgFiles.map((entry, index) => ({
  id: index,
  name: entry.name,
  category: entry.category,
  tags: entry.tags,
  svgPath: `/svg/${entry.file}`,
  Svg: ({ rotation = 0, width = 40, height = 40 }) => (
    // Using a plain img so we reference SVGs from /public/svg directly
    // Color/thickness are defined by the SVG asset itself.
    <img
      src={`/svg/${entry.file}`}
        width={width}
        height={height}
      alt={entry.name}
      style={{ transform: `rotate(${rotation}deg)`, objectFit: "contain" }}
    />
  ),
}));


