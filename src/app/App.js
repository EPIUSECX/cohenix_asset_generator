"use client";

import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import "@/styles/inputColors.css";
import "@/styles/mask.css";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import MockupsCard from "@/components/cards/ProductCard";
import SvgGalleryModal from "@/components/modals/GalleryModal";
import SvgGalleryButton from "@/components/buttons/GalleryButton";
import LoginModal from "@/components/auth/components/AuthModal";
import Alert from "../components/alerts/Alert";

import useClickOutside from "@/hooks/useClickOutside";
import useHandleEscKey from "@/hooks/handle-key/useHandleEscKey";
import useDownloadSvg from "@/hooks/download-svg-png/useDownloadSvg";
import useDownloadPng from "@/hooks/download-svg-png/useDownloadPng";
import { AppProvider, useAppContext } from "@/context/AppContext";

import { SvgList } from "@/utils/SvgList";
import { BRAND } from "@/config/brand";
import {
  LOGO_FONT_PRESETS,
  LOGO_BACKGROUND_PRESETS,
  getLogoFontPreset,
  getLogoBackgroundPreset,
} from "@/config/logoOptions";
import { getLogoGradientPattern } from "@/config/logoGradients";
import GradientModal from "@/components/modals/GradientModal";
import { EMAIL_TEMPLATES, buildSignatureHtml } from "@/utils/emailTemplates";
import { EmailSignaturePreview } from "@/components/signature/EmailSignaturePreview";
import { toPng } from "html-to-image";
import { CircleAlert, FileWarning } from "lucide-react";

const EXPORT_PRESETS = {
  standard: { label: "Standard", svgSize: 80, pixelRatio: 2 },
  high: { label: "High quality", svgSize: 120, pixelRatio: 3 },
  ultra: { label: "Ultra", svgSize: 160, pixelRatio: 4 },
};

// Componente principal que usa el contexto
function AppContent() {
  const {
    state,
    dispatch,
    toggleSidebar,
    toggleSvgGallery,
    toggleLoginModal,
    handleNameChange,
    handleColorChange,
    handleThicknessChange,
    handleRotationChange,
    handleSvgSelect,
    handleLogoChange,
    handleLogoError,
    handleLogoWarning,
  } = useAppContext();

  const {
    name,
    color,
    thickness,
    rotation,
    selectedSvg,
    userLogo,
    showSidebar,
    showSvgGallery,
    showLoginModal,
    logoError,
    logoWarning,
  } = state;

  const sidebarRef = useRef(null);
  const [mode, setMode] = useState("logos"); // 'logos' | 'email'
  const signatureRef = useRef(null);

  const [logoFontPresetId, setLogoFontPresetId] = useState(
    LOGO_FONT_PRESETS[0]?.id || "sans",
  );
  const [logoBackgroundPresetId, setLogoBackgroundPresetId] = useState(
    LOGO_BACKGROUND_PRESETS[0]?.id || "brand-dark",
  );

  const [useGradientBackground, setUseGradientBackground] = useState(false);
  const [gradientPatternId, setGradientPatternId] = useState("soft-diagonal");
  const [gradientPrimaryColor, setGradientPrimaryColor] = useState("#0400f5");
  const [gradientSecondaryColor, setGradientSecondaryColor] =
    useState("#60a5fa");
  const [showGradientModal, setShowGradientModal] = useState(false);

  const [signatureState, setSignatureState] = useState({
    fullName: "Founder Cohenix",
    title: "An EPI-USE Service Line",
    mobile: "0735997905",
    email: "marketing@cohenix.com",
    timezone: "UTC+02:00 Africa/Johannesburg",
    website: BRAND.url,
    disclaimerUrl: `${BRAND.url}/disclaimer`,
    groupUrl: "https://www.groupelephant.com",
    erpUrl: "https://erp.ngo",
    templateId: EMAIL_TEMPLATES[0]?.id ?? "cohenix-default",
  });
  const [exportPresetKey, setExportPresetKey] = useState("high");
  const currentPreset = EXPORT_PRESETS[exportPresetKey] || EXPORT_PRESETS.high;
  const currentTemplate =
    EMAIL_TEMPLATES.find((t) => t.id === signatureState.templateId) ||
    EMAIL_TEMPLATES[0];

  const currentLogoFontPreset = getLogoFontPreset(logoFontPresetId);
  const currentLogoBackgroundPreset = getLogoBackgroundPreset(
    logoBackgroundPresetId,
  );

  const currentGradientPattern = getLogoGradientPattern(gradientPatternId);

  const logoGradientStyle = useGradientBackground
    ? {
        backgroundImage: currentGradientPattern.build({
          primary: gradientPrimaryColor || color,
          secondary: gradientSecondaryColor || color,
        }),
      }
    : {};

  const signatureData = {
    ...signatureState,
    bannerPath: currentTemplate?.bannerPath,
    bannerUrl: `${typeof window !== "undefined" ? window.location.origin : ""}${
      currentTemplate?.bannerPath || ""
    }`,
    primaryColor: BRAND.primaryColor,
  };

  const svgOptions = useRef({
    color,
    rotation,
    thickness,
    width: currentPreset.svgSize,
    height: currentPreset.svgSize,
  });

  useEffect(() => {
    svgOptions.current = {
      color,
      rotation,
      thickness,
      width: currentPreset.svgSize,
      height: currentPreset.svgSize,
    };
  }, [color, rotation, thickness, currentPreset.svgSize]);

  const downloadSvg = useDownloadSvg(selectedSvg, svgOptions.current);
  const downloadPng = useDownloadPng(selectedSvg, svgOptions.current, name);

  const handleCopySignatureHtml = useCallback(async () => {
    try {
      const html = buildSignatureHtml(signatureData);
      if (navigator.clipboard && window.ClipboardItem) {
        const blobHtml = new Blob([html], { type: "text/html" });
        const blobText = new Blob([html], { type: "text/plain" });
        const item = new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(html);
      }
      alert("Signature HTML (rich) copied to clipboard. Paste it into Outlook's signature editor.");
    } catch (e) {
      console.error("Failed to copy signature HTML", e);
      alert("Unable to copy HTML. Please try again.");
    }
  }, [signatureData]);

  const handleDownloadSignaturePng = useCallback(async () => {
    if (!signatureRef.current) return;
    try {
      const node = signatureRef.current;
      const rect = node.getBoundingClientRect();
      const width = rect.width;
      const height = node.scrollHeight || rect.height;

      const dataUrl = await toPng(node, {
        cacheBust: true,
        quality: 1,
        pixelRatio: currentPreset.pixelRatio,
        width,
        height,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "#ffffff",
        },
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${signatureState.fullName || "signature"}.png`;
      link.click();
    } catch (e) {
      console.error("Error downloading signature PNG", e);
      alert("Unable to download signature image.");
    }
  }, [currentPreset.pixelRatio, signatureState.fullName]);

  const primaryDownload = mode === "email" ? handleCopySignatureHtml : downloadSvg;
  const secondaryDownload = mode === "email" ? handleDownloadSignaturePng : downloadPng;
  const showMockupsDownload = mode === "logos";

  const logoGalleryItems = SvgList;
  const bannerGalleryItems = useMemo(
    () =>
      EMAIL_TEMPLATES.map((t, index) => ({
        id: t.id,
        name: t.name,
        Svg: ({ width = 80, height = 80 }) => (
          // Banner preview clipped to rounded square, so it fits the gallery card
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={t.bannerPath}
              alt={t.name}
              style={{ width: "80%", height: "80%", objectFit: "cover", borderRadius: "0.75rem" }}
            />
          </div>
        ),
      })),
    [],
  );

  const galleryItems = mode === "logos" ? logoGalleryItems : bannerGalleryItems;

  const handleGallerySelect = (item) => {
    if (mode === "logos") {
      handleSvgSelect(item);
    } else {
      setSignatureState((prev) => ({
        ...prev,
        templateId: item.id || prev.templateId,
      }));
    }
  };

  const selectedGalleryItem =
    mode === "logos"
      ? selectedSvg
      : bannerGalleryItems.find((b) => b.id === signatureState.templateId) ||
        bannerGalleryItems[0];

  const downloadAllMockups = useCallback(() => {
    if (
      window.downloadAllMockups &&
      typeof window.downloadAllMockups === "function"
    ) {
      window.downloadAllMockups();
    } else {
      console.error("The downloadAllMockups function is not available.");
    }
  }, []);

  useClickOutside(sidebarRef, () => {
    if (showSidebar) toggleSidebar();
  });

  useHandleEscKey(showSvgGallery, toggleSvgGallery);
  useHandleEscKey(showLoginModal, toggleLoginModal);

  return (
    <div className="flex h-screen flex-col">
      <div className="relative">
        <Header
          handleDownloadSvg={primaryDownload}
          handleDownloadPng={secondaryDownload}
          downloadAllMockups={showMockupsDownload ? downloadAllMockups : () => {}}
          mode={mode}
          onLoginClick={toggleLoginModal}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className="relative flex h-full">
        {showSidebar && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={toggleSidebar}
          />
        )}

        <aside
          ref={sidebarRef}
          className={`absolute top-1/3 left-1/2 z-50 h-full w-5/5 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/5 backdrop-blur-md transition-opacity duration-300 ease-in-out dark:bg-white ${
            showSidebar ? "opacity-100" : "pointer-events-none opacity-0"
          } md:hidden`}
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <div className="flex h-full max-h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="text-xl font-bold">Settings</h2>
              <button
                onClick={toggleSidebar}
                className="rounded-full p-2 hover:bg-gray-200/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pb-6">
              <Sidebar
                name={name}
                handleNameChange={handleNameChange}
                rotation={rotation}
                handleRotationChange={handleRotationChange}
                thickness={thickness}
                handleThicknessChange={handleThicknessChange}
                color={color}
                handleColorChange={handleColorChange}
                onLogoChange={handleLogoChange}
                onLogoError={handleLogoError}
                onLogoWarning={handleLogoWarning}
                mode={mode}
                onModeChange={setMode}
                logoFontPresetId={logoFontPresetId}
                onLogoFontPresetChange={setLogoFontPresetId}
                logoBackgroundPresetId={logoBackgroundPresetId}
                onLogoBackgroundPresetChange={setLogoBackgroundPresetId}
                useGradientBackground={useGradientBackground}
                onToggleGradientBackground={setUseGradientBackground}
                onOpenGradientModal={() => setShowGradientModal(true)}
                signatureState={signatureState}
                onSignatureChange={(field, value) =>
                  setSignatureState((prev) => ({ ...prev, [field]: value }))
                }
                exportPresetKey={exportPresetKey}
                onExportPresetChange={setExportPresetKey}
                exportPresetOptions={Object.entries(EXPORT_PRESETS).map(
                  ([key, preset]) => ({
                    key,
                    label: preset.label,
                  }),
                )}
              >
                <SvgGalleryButton mode={mode} onClick={toggleSvgGallery} />
              </Sidebar>
            </div>
          </div>
        </aside>

        {logoError && (
          <div className="fixed top-4 right-4 z-50">
            <Alert
              label="Logo Error"
              description="Only svg format files"
              position="BOTTOM_RIGHT"
              icon={<CircleAlert className="h-4 w-4" />}
              autoClose={5000}
              onClose={() => dispatch({ type: "CLEAR_LOGO_ERROR" })}
              className="w-fit"
            />
          </div>
        )}

        {logoWarning && !logoError && (
          <div className="fixed top-4 right-4 z-50">
            <Alert
              label="Logo Warning"
              description="We recommend using SVG vector images."
              position="TOP"
              icon={<FileWarning className="h-4 w-4" />}
              autoClose={8000}
              onClose={() => dispatch({ type: "CLEAR_LOGO_WARNING" })}
            />
          </div>
        )}

        <aside className="relative hidden h-full w-64 flex-shrink-0 overflow-y-auto md:block">
          <Sidebar
            name={name}
            handleNameChange={handleNameChange}
            rotation={rotation}
            handleRotationChange={handleRotationChange}
            thickness={thickness}
            handleThicknessChange={handleThicknessChange}
            color={color}
            handleColorChange={handleColorChange}
            onLogoChange={handleLogoChange}
            onLogoError={handleLogoError}
            onLogoWarning={handleLogoWarning}
            mode={mode}
            onModeChange={setMode}
            logoFontPresetId={logoFontPresetId}
            onLogoFontPresetChange={setLogoFontPresetId}
            logoBackgroundPresetId={logoBackgroundPresetId}
            onLogoBackgroundPresetChange={setLogoBackgroundPresetId}
            useGradientBackground={useGradientBackground}
            onToggleGradientBackground={setUseGradientBackground}
            onOpenGradientModal={() => setShowGradientModal(true)}
            signatureState={signatureState}
            onSignatureChange={(field, value) =>
              setSignatureState((prev) => ({ ...prev, [field]: value }))
            }
            exportPresetKey={exportPresetKey}
            onExportPresetChange={setExportPresetKey}
            exportPresetOptions={Object.entries(EXPORT_PRESETS).map(
              ([key, preset]) => ({
                key,
                label: preset.label,
              }),
            )}
          >
            <SvgGalleryButton mode={mode} onClick={toggleSvgGallery} />
          </Sidebar>
        </aside>

        <div className="flex w-full flex-col overflow-y-auto border-white/10 px-2 pb-3 md:pb-20 dark:border-black/10">
          {mode === "logos" && (
            <>
              <MockupsCard
                name={name}
                colorSelection={color}
                rotationSelection={rotation}
                thicknessSelection={thickness}
                selectedSvg={selectedSvg}
                userLogo={userLogo}
                exportPixelRatio={currentPreset.pixelRatio}
                logoFontFamily={currentLogoFontPreset.stack}
                logoBackgroundPresetId={currentLogoBackgroundPreset.id}
                logoGradientStyle={logoGradientStyle}
                useGradientBackground={useGradientBackground}
              />
              <div className="mb-24 flex justify-center py-8 md:hidden"></div>
            </>
          )}
          {mode === "email" && (
            <EmailSignaturePreview ref={signatureRef} data={signatureData} />
          )}
        </div>

        <SvgGalleryModal
          show={showSvgGallery}
          onClose={toggleSvgGallery}
          svgList={galleryItems}
          onSelect={handleGallerySelect}
          selectedSvg={selectedGalleryItem}
        />

        <LoginModal show={showLoginModal} onClose={toggleLoginModal} />

        <GradientModal
          show={showGradientModal}
          onClose={() => setShowGradientModal(false)}
          initialPatternId={gradientPatternId}
          initialPrimary={gradientPrimaryColor || color}
          initialSecondary={gradientSecondaryColor || color}
          onSave={({ patternId, primary, secondary }) => {
            setGradientPatternId(patternId);
            setGradientPrimaryColor(primary);
            setGradientSecondaryColor(secondary);
            setUseGradientBackground(true);
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider initialSvg={SvgList[0]}>
      <AppContent />
    </AppProvider>
  );
}
