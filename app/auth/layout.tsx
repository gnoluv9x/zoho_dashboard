import StyledComponentsRegistry from "@/lib/registry";
import "../global.css";

export const metadata = {
  title: "Zoho dashboard | Login",
  description: "Generated by gnoluv",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
