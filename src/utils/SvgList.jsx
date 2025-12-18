const svgFiles = [
  // Make ERP the first/default logo
  {
    name: "ERP",
    file: "erp.svg",
    category: "Business",
    tags: ["erp", "operations", "system"],
    templateType: "icon",
  },
  {
    name: "Books",
    file: "Books.svg",
    category: "Knowledge",
    tags: ["books", "library", "knowledge"],
    templateType: "icon",
  },
  {
    name: "Builder",
    file: "Builder.svg",
    category: "Platform",
    tags: ["builder", "platform", "tools"],
    templateType: "icon",
  },
  {
    name: "Cohenix Framework",
    file: "cohenix-framework.svg",
    category: "Platform",
    tags: ["framework", "cohenix"],
    templateType: "lockup",
  },
  {
    name: "CRM",
    file: "crm.svg",
    category: "Business",
    tags: ["crm", "sales", "customers"],
    templateType: "icon",
  },
  {
    name: "Drive",
    file: "Drive.svg",
    category: "Storage",
    tags: ["drive", "storage", "files"],
    templateType: "icon",
  },
  {
    name: "Education",
    file: "Education.svg",
    category: "Knowledge",
    tags: ["education", "learning"],
    templateType: "icon",
  },
  {
    name: "Gameplan",
    file: "Gameplan.svg",
    category: "Planning",
    tags: ["plan", "strategy", "roadmap"],
    templateType: "icon",
  },
  {
    name: "Health",
    file: "Health.svg",
    category: "Health",
    tags: ["health", "wellness"],
    templateType: "icon",
  },
  {
    name: "Helpdesk",
    file: "Helpdesk.svg",
    category: "Support",
    tags: ["support", "helpdesk"],
    templateType: "icon",
  },
  {
    name: "HR",
    file: "HR.svg",
    category: "People",
    tags: ["hr", "people", "team"],
    templateType: "icon",
  },
  {
    name: "Insights",
    file: "Insights.svg",
    category: "Analytics",
    tags: ["analytics", "insights", "reports"],
    templateType: "icon",
  },
  {
    name: "LMS",
    file: "LMS.svg",
    category: "Knowledge",
    tags: ["lms", "learning", "courses"],
    templateType: "icon",
  },
  {
    name: "Wiki",
    file: "WIKI.svg",
    category: "Knowledge",
    tags: ["wiki", "documentation"],
    templateType: "icon",
  },
];

export const SvgList = svgFiles.map((entry, index) => ({
  id: index,
  name: entry.name,
  category: entry.category,
  tags: entry.tags,
   templateType: entry.templateType || "icon",
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


