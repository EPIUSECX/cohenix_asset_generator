const svgFiles = [
  // Make ERP the first/default logo
  { name: "ERP", file: "erp.svg" },
  { name: "Books", file: "Books.svg" },
  { name: "Builder", file: "Builder.svg" },
  { name: "Cohenix Framework", file: "cohenix-framework.svg" },
  { name: "CRM", file: "crm.svg" },
  { name: "Drive", file: "Drive.svg" },
  { name: "Education", file: "Education.svg" },
  { name: "Gameplan", file: "Gameplan.svg" },
  { name: "Health", file: "Health.svg" },
  { name: "Helpdesk", file: "Helpdesk.svg" },
  { name: "HR", file: "HR.svg" },
  { name: "Insights", file: "Insights.svg" },
  { name: "LMS", file: "LMS.svg" },
  { name: "Wiki", file: "WIKI.svg" },
];

export const SvgList = svgFiles.map((entry, index) => ({
  id: index,
  name: entry.name,
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


