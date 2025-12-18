import { MoveUpRight, Sparkles, ChevronDown, Layers } from "lucide-react";
import { useState, useEffect } from "react";

import ColorsControl from "@/components/editor/ColorPicker";
import InputControl from "@/components/form/ControlInput";
import RotationControl from "@/components/editor/RotationControl";
import ThicknessControl from "@/components/editor/ThicknessControl";
import LogoUploader from "@/components/editor/LogoSelector";
import SignatureField from "@/components/signature/SignatureField";
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
  mode,
  onModeChange,
  signatureState,
  onSignatureChange,
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
          {/* Mode selector */}
          {onModeChange && (
            <div className="flex flex-col border-t border-white/5 p-4 dark:border-black/10">
              <span className="mb-2 flex items-center gap-2 text-sm font-light">
                <Layers className="h-3 w-3" />
                Mode
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onModeChange("logos")}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                    mode === "logos"
                      ? "bg-white text-black"
                      : "bg-black/20 text-white hover:bg-black/40 dark:bg-white/20 dark:text-black dark:hover:bg-white/40"
                  }`}
                >
                  Logos
                </button>
                <button
                  type="button"
                  onClick={() => onModeChange("email")}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                    mode === "email"
                      ? "bg-white text-black"
                      : "bg-black/20 text-white hover:bg-black/40 dark:bg-white/20 dark:text-black dark:hover:bg-white/40"
                  }`}
                >
                  Email signature
                </button>
              </div>
            </div>
          )}

          {mode === "logos" && (
            <>
              {children}

              <LogoUploader
                onLogoUploaded={handleLogoUploaded}
                onError={onLogoError}
                onWarning={onLogoWarning}
              />

              <InputControl name={name} handleNameChange={handleNameChange} />
              <ColorsControl
                color={color}
                handleColorChange={handleColorChange}
              />
              <RotationControl
                inputValue={rotation}
                handleRotationChange={handleRotationChange}
              />
              <ThicknessControl
                inputValue={thickness}
                handleThicknessChange={handleThicknessChange}
              />
            </>
          )}

          {mode === "email" && signatureState && onSignatureChange && (
            <>
              {children}

              <SignatureField
                label="Full name"
                value={signatureState.fullName}
                onChange={(v) => onSignatureChange("fullName", v)}
              />
              <SignatureField
                label="Title"
                value={signatureState.title}
                onChange={(v) => onSignatureChange("title", v)}
              />
              <SignatureField
                label="Mobile"
                value={signatureState.mobile}
                onChange={(v) => onSignatureChange("mobile", v)}
              />
              <SignatureField
                label="Email"
                value={signatureState.email}
                onChange={(v) => onSignatureChange("email", v)}
              />
              <SignatureField
                label="Timezone"
                value={signatureState.timezone}
                onChange={(v) => onSignatureChange("timezone", v)}
              />
              <SignatureField
                label="Website URL"
                value={signatureState.website}
                onChange={(v) => onSignatureChange("website", v)}
              />
              <SignatureField
                label="Disclaimer URL"
                value={signatureState.disclaimerUrl}
                onChange={(v) => onSignatureChange("disclaimerUrl", v)}
              />
              <SignatureField
                label="Group Elephant URL"
                value={signatureState.groupUrl}
                onChange={(v) => onSignatureChange("groupUrl", v)}
              />
              <SignatureField
                label="ERP URL"
                value={signatureState.erpUrl}
                onChange={(v) => onSignatureChange("erpUrl", v)}
              />
            </>
          )}

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
