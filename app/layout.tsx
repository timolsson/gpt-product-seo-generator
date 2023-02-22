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
                href="https://github.com/dabit3/gpt-travel-advisor"
              >
                <Image
                  style={{ marginTop: "2px" }}
                  alt="code available on github"
                  width="18"
                  height="18"
                  src="/github.svg"
                />
              </a>
            </span>{" "}
            but inspired and templated from roamaround.io
          </p>
        </footer>
      </body>
    </html>
  );
}
