export const EMAIL_TEMPLATES = [
  {
    id: "cohenix-default",
    name: "Cohenix Default",
    bannerPath: "/banners/Email-banner-1.jpg",
  },
  {
    id: "cohenix-2",
    name: "Cohenix Banner 2",
    bannerPath: "/banners/Email-banner-2.jpg",
  },
  {
    id: "cohenix-3",
    name: "Cohenix Banner 3",
    bannerPath: "/banners/Email-banner-3.jpg",
  },
  {
    id: "cohenix-4",
    name: "Cohenix Banner 4",
    bannerPath: "/banners/Email-banner-4.jpg",
  },
  {
    id: "cohenix-5",
    name: "Cohenix Banner 5",
    bannerPath: "/banners/Email-banner-5.jpg",
  },
  {
    id: "cohenix-6",
    name: "Cohenix Banner 6",
    bannerPath: "/banners/Email-banner-6.jpg",
  },
  {
    id: "cohenix-7",
    name: "Cohenix Banner 7",
    bannerPath: "/banners/Email-banner-7.jpg",
  },
  {
    id: "cohenix-8",
    name: "Cohenix Banner 8",
    bannerPath: "/banners/Email-banner-8.jpg",
  },
  {
    id: "cohenix-9",
    name: "Cohenix Banner 9",
    bannerPath: "/banners/Email-banner-9.jpg",
  },
  {
    id: "cohenix-footer",
    name: "Cohenix Footer Banner",
    bannerPath: "/banners/Email-banner-footer.jpg",
  },
];

const displayHost = (url) => {
  if (!url) return "";
  try {
    const withProtocol = url.startsWith("http") ? url : `https://${url}`;
    const parsed = new URL(withProtocol);
    return parsed.host;
  } catch {
    return url;
  }
};

export function buildSignatureHtml(data) {
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
    bannerUrl,
    primaryColor,
  } = data;

  return `
  <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; color: #ffffff; background-color: #111111; width: 600px;">
    <tr>
      <td style="padding: 12px 16px;">
        <div style="font-size:16px; font-weight:bold;">
          <span style="color:${primaryColor};">${fullName}</span> | ${title}
        </div>
        <div style="margin-top:4px; font-size:13px; color:#e5e5e5;">
          <span>Mobile: ${mobile}</span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span>Email: <a href="mailto:${email}" style="color:${primaryColor}; text-decoration:none;">${email}</a></span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span>${timezone}</span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="${website}" style="color:${primaryColor}; text-decoration:none;">${displayHost(
            website,
          )}</a>
        </div>
        <div style="margin-top:8px; font-size:12px; color:#cccccc;">
          A member of <a href="${groupUrl}" style="color:${primaryColor}; text-decoration:none;">Group Elephant</a>, going Beyond Corporate Purpose with Elephants, Rhinos &amp; People (ERP). For more information about ERP, please visit
          <a href="${erpUrl}" style="color:${primaryColor}; text-decoration:none;">${displayHost(
            erpUrl,
          )}</a>.
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:0; border-top:1px solid #222222;">
        <img src="${bannerUrl}" alt="Cohenix" style="display:block; width:100%; max-width:600px; border:0; outline:none;" />
      </td>
    </tr>
    <tr>
      <td style="padding:8px 16px; font-size:11px; color:#999999;">
        <a href="${disclaimerUrl}" style="color:${primaryColor}; text-decoration:none;">Disclaimer</a>
      </td>
    </tr>
  </table>
  `.trim();
}


