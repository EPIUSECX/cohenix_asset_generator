import { useCallback } from "react";

const useDownloadSvg = (selectedSvg, options) => {
  return useCallback(() => {
    if (!selectedSvg) return;

    const { name, SvgString, svgPath } = selectedSvg;

    // If we have an inline generator, use it (old behavior)
    const downloadFromString = () => {
      const svgString = SvgString(options);
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      const link = document.createElement("a");
      link.href = svgUrl;
      link.download = `${name}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(svgUrl);
    };

    // If we only have a path (new /public/svg assets), fetch the raw SVG
    const downloadFromPath = async () => {
      try {
        const response = await fetch(svgPath);
        const svgText = await response.text();
        const svgBlob = new Blob([svgText], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);

        const link = document.createElement("a");
        link.href = svgUrl;
        link.download = `${name}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(svgUrl);
      } catch (error) {
        console.error("Error downloading SVG from path:", error);
      }
    };

    if (SvgString) {
      downloadFromString();
    } else if (svgPath) {
      downloadFromPath();
    }
  }, [selectedSvg, options]);
};

export default useDownloadSvg;
