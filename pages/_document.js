import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <html lang="en" />

        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

        {/* <link rel="preload" as="font" /> */}
        <link rel="icon" href="/favicon.ico" />

        {/* <meta property="og:type" content="website" />
        <meta key='title' property="og:title" content="Arda Fevzi Armutcu's Portfolio" />
        <meta key='description' property="og:description" content="Personal Website" />
        <meta key='image' property="og:image" content="/icon.png" /> */}

        {/* <!-- Open Graph / Facebook --> */}
        {/* <meta key="ogType" property="og:type" content="website" />
        <meta key="ogUrl" property="og:url" content={"https://ardarmutcu.com"} />
        <meta key="ogTitle" property="og:title" content="Arda Fevzi Armutcu's Portfolio" />
        <meta key="ogDescription" property="og:description" content="Personal Website" />
        <meta key="ogImage" property="og:image" content="/icon.png" /> */}

        {/* <!-- Twitter --> */}
        {/* <meta key="twCard" property="twitter:card" content="summary_large_image" />
        <meta key="twUrl" property="twitter:url" content={"https://ardarmutcu.com"} />
        <meta key="twTitle" property="twitter:title" content="Arda Fevzi Armutcu's Portfolio" />
        <meta key="twDescription" property="twitter:description" content="Personal Website" />
        <meta key="twImage" property="twitter:image" content="/icon.png" /> */}

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}