import "./globals.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="wrapper">{children}</div>
        <footer className="footer">
          <p>
            Built by {"Tim Olsson "}
            <span>
              <a
                target="_blank"
                rel="no-opener"
                href="https://github.com/timolsson"
              >
                <Image
                  style={{ marginTop: "2px" }}
                  alt="code available on github"
                  width="18"
                  height="18"
                  src="/github.svg"
                />
              </a>
            </span>
          </p>
        </footer>
      </body>
    </html>
  );
}
