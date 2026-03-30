import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "InsightED",
  description: "InsightED — единый цифровой школьный портал",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Script id="insighted-theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var saved = localStorage.getItem("insighted-theme");
                var theme = saved === "light" ? "light" : "dark";
                var root = document.documentElement;
                root.dataset.theme = theme;
                root.classList.toggle("theme-dark", theme === "dark");
                root.classList.toggle("theme-light", theme === "light");
              } catch (error) {}
            })();
          `}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
