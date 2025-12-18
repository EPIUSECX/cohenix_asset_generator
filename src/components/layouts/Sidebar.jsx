import { MoveUpRight, Sparkles, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

import ColorsControl from "@/components/editor/ColorPicker";
import InputControl from "@/components/form/ControlInput";
import RotationControl from "@/components/editor/RotationControl";
import ThicknessControl from "@/components/editor/ThicknessControl";
import LogoUploader from "@/components/editor/LogoSelector";
import Image from "next/image";

function Sidebar({
  name,
  handleNameChange,
  rotation,
  handleRotationChange,
  thickness,
  handleThicknessChange,
  color,
  handleColorChange,
  onLogoChange,
  children,
  onLogoError,
  onLogoWarning,
  exportPresetKey,
  onExportPresetChange,
  exportPresetOptions = [],
}) {
  const [userLogo, setUserLogo] = useState(null);

  const handleLogoUploaded = (logoDataUrl) => {
    setUserLogo(logoDataUrl);
    if (onLogoChange) {
      onLogoChange(logoDataUrl);
    }
  };

  useEffect(() => {
    if (onLogoChange) {
      onLogoChange(userLogo);
    }
  }, [userLogo, onLogoChange]);

  const currentExportLabel =
    exportPresetOptions.find((opt) => opt.key === exportPresetKey)?.label ??
    exportPresetKey;

  return (
    <aside className="relative flex h-full w-full flex-col md:max-w-2xs md:min-w-[200px]">
      <div className="absolute top-0 bottom-0 left-0 hidden h-full w-4 border-x border-x-white bg-[image:repeating-linear-gradient(315deg,_white_0,_white_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed opacity-5 md:block dark:border-black dark:bg-[image:repeating-linear-gradient(315deg,_black_0,_black_1px,_transparent_0,_transparent_50%)]" />

      <div className="absolute right-0 hidden h-full w-4 border-x border-x-white bg-[image:repeating-linear-gradient(315deg,_white_0,_white_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed opacity-5 md:block dark:border-black dark:bg-[image:repeating-linear-gradient(315deg,_black_0,_black_1px,_transparent_0,_transparent_50%)]" />

      <div className="relative flex h-full flex-col overflow-y-auto">
        <div className="flex flex-col px-0 pb-24 md:px-4">
          {children}

          <LogoUploader
            onLogoUploaded={handleLogoUploaded}
            onError={onLogoError}
            onWarning={onLogoWarning}
          />

          <InputControl name={name} handleNameChange={handleNameChange} />
          <ColorsControl color={color} handleColorChange={handleColorChange} />
          <RotationControl
            inputValue={rotation}
            handleRotationChange={handleRotationChange}
          />
          <ThicknessControl
            inputValue={thickness}
            handleThicknessChange={handleThicknessChange}
          />

          {exportPresetOptions.length > 0 && (
            <div className="flex flex-col border-t border-white/5 p-4 dark:border-black/10">
              <span className="mb-2 flex items-center gap-2 text-sm font-light">
                <Sparkles className="h-3 w-3" />
                Export quality
              </span>
              <div className="mx-auto w-full max-w-md">
                <div className="relative flex h-12 items-center gap-3 rounded-full border border-dashed border-white/10 bg-black/5 pr-6 pl-4 dark:border-black/20 dark:bg-white/5">
                  <div className="relative flex h-6 w-full items-center justify-between text-xs font-semibold whitespace-nowrap text-white dark:text-black">
                    <span>{currentExportLabel}</span>
                    <ChevronDown className="h-3 w-3 opacity-70" />
                  </div>
                  <select
                    value={exportPresetKey}
                    onChange={(e) =>
                      onExportPresetChange &&
                      onExportPresetChange(e.target.value)
                    }
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  >
                    {exportPresetOptions.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
