import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { flagsInitScript } from "@/lib/analytics";
import "./globals.css";

// Fallback for platforms without SF Pro; the stack in globals.css prefers the system font.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karan Patel | Data Analyst / Software Developer",
  description:
    "Karan Patel: Data Analyst and Software Developer with 3+ years turning requirements into dashboards, KPI frameworks, and measurable process improvements, backed by hands-on software and AI/ML engineering experience.",
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: flagsInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
