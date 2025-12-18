import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolageFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-Bricolage",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Cohenix",
  description: "Cohenix – SVG logo previewer for customizing and downloading logos with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${bricolageFont.className} overflow-x-hidden bg-[#0A0A0A] font-serif text-white antialiased transition-colors duration-300 dark:bg-white dark:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
