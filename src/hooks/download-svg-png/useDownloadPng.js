import { useCallback } from "react";

const useDownloadPng = (selectedSvg, options, filename) => {
  return useCallback(() => {
    if (!selectedSvg) return;

    const { SvgString, svgPath } = selectedSvg;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Aggressive scaling for very high resolution PNG exports
    canvas.width = options.width * 40;
    canvas.height = options.height * 40;

    const img = new Image();

    const drawAndDownload = (urlToUse) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const pngUrl = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = `${filename || "image"}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(pngUrl);
          if (urlToUse.startsWith("blob:")) {
            URL.revokeObjectURL(urlToUse);
          }
        }, "image/png");
      };

      img.src = urlToUse;
    };

    // Prefer inline SvgString when available (old behavior with dynamic color/rotation)
    if (SvgString) {
      const svgString = SvgString(options);
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);
      drawAndDownload(svgUrl);
    } else if (svgPath) {
      // For /public/svg assets, draw directly from the file path
      drawAndDownload(svgPath);
    }
  }, [selectedSvg, options, filename]);
};

export default useDownloadPng;
