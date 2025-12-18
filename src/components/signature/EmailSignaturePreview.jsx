"use client";

import React from "react";

const getDisplayHost = (url) => {
  if (!url) return "";
  try {
    const withProtocol = url.startsWith("http") ? url : `https://${url}`;
    const parsed = new URL(withProtocol);
    return parsed.host;
  } catch {
    return url;
  }
};

export const EmailSignaturePreview = React.forwardRef(function EmailSignaturePreview(
  { data },
  ref,
) {
  const {
    fullName,
    title,
    mobile,
    email,
    timezone,
    website,
    disclaimerUrl,
    groupUrl,
    erpUrl,
    bannerPath,
    primaryColor,
  } = data;

  return (
    <div
      ref={ref}
      className="mx-auto my-8 w-full max-w-3xl overflow-hidden rounded-2xl bg-white text-neutral-800 shadow-2xl dark:bg-[#111111] dark:text-neutral-100"
    >
      <div className="px-6 py-4">
        <div className="text-base font-semibold">
          <span style={{ color: primaryColor }}>{fullName}</span>
          <span className="mx-1">|</span>
          <span>{title}</span>
        </div>
        <div className="mt-2 text-xs text-neutral-700 dark:text-neutral-200">
          <span>Mobile: {mobile}</span>
          <span className="mx-2">|</span>
          <span>
            Email:{" "}
            <a
              href={`mailto:${email}`}
              style={{ color: primaryColor }}
              className="underline-offset-2 hover:underline"
            >
              {email}
            </a>
          </span>
          <span className="mx-2">|</span>
          <span>{timezone}</span>
          <span className="mx-2">|</span>
          <a
            href={website}
            style={{ color: primaryColor }}
            className="underline-offset-2 hover:underline"
          >
            {getDisplayHost(website)}
          </a>
        </div>
        <div className="mt-3 text-[11px] leading-snug text-neutral-600 dark:text-neutral-300">
          A member of{" "}
          <a
            href={groupUrl}
            style={{ color: primaryColor }}
            className="underline-offset-2 hover:underline"
          >
            Group Elephant
          </a>
          , going Beyond Corporate Purpose with Elephants, Rhinos &amp; People
          (ERP). For more information about ERP, please visit{" "}
          <a
            href={erpUrl}
            style={{ color: primaryColor }}
            className="underline-offset-2 hover:underline"
          >
            {getDisplayHost(erpUrl)}
          </a>
          .
        </div>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <img
          src={bannerPath}
          alt="Cohenix email banner"
          className="block h-auto w-full"
        />
      </div>
      <div className="border-t border-neutral-200 px-6 py-2 text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        <a
          href={disclaimerUrl}
          style={{ color: primaryColor }}
          className="underline-offset-2 hover:underline"
        >
          Disclaimer
        </a>
      </div>
    </div>
  );
});


