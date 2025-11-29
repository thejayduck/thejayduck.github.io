import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-scroll-behavior="smooth">
      <Head>
        <html lang="en" />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />

        {/* <link rel="preload" as="font" /> */}
        <link rel="icon" href="/favicon.ico" />
        <meta property="robots" content="noai,noimageai" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
